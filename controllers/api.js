/**
 * Created by SASi on 14-May-16.
 */

module.exports = (function () {


    const mongoose = global.mongoose;
    const jwt = global.jwt;
    const bcrypt = global.bcrypt;

    const request = require("request");

    const UserModel = require('../models/user');
    const ProjectModel = require('../models/project');
    const ErrorsModel = require('../models/errors');

    const uuid = global.uuid;

    const mail_gun_api_key = 'key-xxxxxxxxxxxxx';  // replace with mail gun API Key
    var domain = 'mydomain.mailgun.org'; // replace with mail gun Domain
    var mailgun = require('mailgun-js')({apiKey: mail_gun_api_key, domain: domain});

    /** Register new user*/
    const register = function (req, res) {

        var data = req.body;

        if (data.password !== data.confirmPassword) {
            res.status(401).json({err: "Password and Confirm Password must be the same"});

        } else {
            var user = new UserModel({
                email: data.email,
                name: data.name,
                password: bcrypt.hashSync(data.password),
                mobile: data.mobile,
                'meta.verification_token': uuid.v4()
            });

            user.save(function (err, userDoc, numAffected) {
                if (err) {
                    if (err.code === 11000) {
                        res.status(400).json({err: "Account already exists"});
                    } else {
                        res.status(400).json(err);
                    }
                }
                else {
                    var myToken = jwt.sign({email: data.email, id: userDoc._id}, global.secret, {expiresIn: '1d'});
                    res.status(200).json({
                        message: "success",
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile,
                        auth_token: myToken
                    });
                }
            });
        }
    };

    /** Login existing user*/
    const login = function (req, res) {

        var data = req.body;

        UserModel.findOne({email: data.email}, function (err, user) {
            if (err) res.status(400).json(err);
            else if (user) {
                bcrypt.compare(data.password, user.password, function (err, status) {
                    if (status) {
                        var myToken = jwt.sign({
                            username: data.email,
                            id: user._id
                        }, global.secret, {expiresIn: '1d'});
                        res.status(200).json({
                            name: user.name,
                            email: user.email,
                            mobile: user.mobile,
                            auth_token: myToken
                        });
                    } else {
                        res.status(401).json({err: "Invalid Password"});
                    }
                });
            } else {
                res.status(401).json({err: "Account doesn't exists."});
            }
        });
    };

    /** Create a new project */
    const addProject = function (req, res) {
        var data = req.body;

        var token = req.headers.authorization.replace("Bearer ", "");

        jwt.verify(token, global.secret, function (err, decoded) {
            if (err) {
                res.status(401).json(err);
            } else {
                var user = decoded;
                var project = new ProjectModel({
                    title: data.title,
                    description: data.description
                });

                project.save(function (err, projectDoc, numAffected) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.status(200).json({
                            _id: projectDoc._id,
                            title: projectDoc.title,
                            description: projectDoc.description
                        });
                    }
                });
            }
        });
    };

    /** List projects related to an User */
    const getProjects = function (req, res) {
        // var data = req.body;
        var token = req.headers.authorization.replace("Bearer ", "");

        jwt.verify(token, global.secret, function (err, decoded) {
            if (err) {
                res.status(401).json(err);
            } else {
                var user = decoded;
                ProjectModel.find({email: user.email}, function (err, projects) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.status(200).json(projects);
                    }
                }).sort('-updated_at');
            }
        });
    };

    /** Get a Project details */
    const getProject = function (req, res) {
        var id = req.params.id;

        var token = req.headers.authorization.replace("Bearer ", "");

        jwt.verify(token, global.secret, function (err, decoded) {
            if (err) {
                res.status(401).json(err);
            } else {
                var user = decoded;
                ProjectModel.findById(id, function (err, project) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.status(200).json(project);
                    }
                });
            }
        });

    };

    /** Update project details */
    const updateProject = function (req, res) {
        var data = req.body;
        var id = req.params.id;
        var emailsConfigured = data.emailsConfigured.split(",");
        var token = req.headers.authorization.replace("Bearer ", "");

        jwt.verify(token, global.secret, function (err, decoded) {
            if (err) {
                res.status(401).json(err);
            } else {
                var user = decoded;
                ProjectModel.findByIdAndUpdate(id, {
                    title: data.title,
                    description: data.description,
                    'configuration.emailsConfigured': emailsConfigured,
                    'configuration.slackConfiguration.api_key': data.slackAPIKey,
                    'configuration.slackConfiguration.channel_name': data.slackChannelName
                }, function (err, project) {
                    if (err) res.status(400).json(err);
                    else res.status(200).json(project);
                });
            }
        });

    };

    /** Delete a project */
    const deleteProject = function (req, res) {
        var id = req.params.id;
        var token = req.headers.authorization.replace("Bearer ", "");

        jwt.verify(token, global.secret, function (err, decoded) {
            if (err) {
                res.status(401).json(err);
            } else {
                var user = decoded;
                ProjectModel.findByIdAndRemove(id, function (err) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.status(200).json({message: "success"});
                    }
                });
            }
        });
    };

    const reportError = function (req, res) {
        var data = req.body;

        ProjectModel.findById(data.key, function (err, project) {
            if (err) res.status(400).json(err);
            else if (project != null) {
                var report = new ErrorsModel({
                    error_type: data.error_type,
                    error_message: data.error_message,
                    url: data.url,
                    line_number: data.line_number,
                    column_number: data.column_number,
                    stack_trace: data.stack_trace,
                    browser_details: data.browser_details,
                    operating_system: data.operating_system,
                    time_stamp: data.time_stamp
                });

                report.save(function (err, reportDoc, numAffected) {
                    if (err) res.status(400).json(err);
                    else {
                        project.reports.push(reportDoc._id);
                        project.save(function (err) {
                            if (err) res.status(400).json(err);
                            else {
                                res.status(200).json({message: "success"});

                                var rececipients = project.configuration.emailsConfigured;

                                /** mail */
                                if (!rececipients.length)
                                    return;
                                else {
                                    var mail_data = {
                                        from: 'Bug Tracker <no-reply@bugtracker.mailgun.org>',
                                        to: rececipients,
                                        subject: 'Bug Report',
                                        html: '<pre>' + "Project Name: " + project.title +
                                        "\nError Type: " + data.error_type + "\nError Message: " + data.error_message +
                                        "\nurl: " + data.url + "\nLine Number: " + data.line_number + "\nColumn Number: "
                                        + data.column_number + "\nStack Trace: " + data.stack_trace +
                                        "\nBrowser Details: " + data.browser_details + "\nOperating System: " +
                                        data.operating_system + "\nTime Stamp: " + data.time_stamp
                                        + '</pre>'
                                    };

                                    mailgun.messages().send(mail_data, function (error, body) {
                                        console.log(body);
                                    });
                                }

                                /**slack*/
                                var slackAPIKey = project.configuration.slackConfiguration.api_key;
                                var channelName = project.configuration.slackConfiguration.channel_name;

                                var options = {
                                    method: 'POST',
                                    uri: 'https://slack.com/api/chat.postMessage',
                                    form: {
                                        token: slackAPIKey,
                                        channel: channelName,
                                        text: 'Bug Report : ' + JSON.stringify(data)
                                    }
                                };

                                request(options, function (error, response, body) {
                                    if (error) console.log(error);
                                    else console.log(response);
                                });
                            }
                        });
                    }
                })
            } else {
                res.status(502).json({err: "Not found"});
            }
        });
    };

    return {
        register: register,
        login: login,
        addProject: addProject,
        getProjects: getProjects,
        getProject: getProject,
        updateProject: updateProject,
        deleteProject: deleteProject,
        reportError: reportError
    }

})();