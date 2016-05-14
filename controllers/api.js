/**
 * Created by SASi on 14-May-16.
 */

module.exports = (function () {

    const mongoose = global.mongoose;
    const jwt = global.jwt;
    const bcrypt = global.bcrypt;

    const UserModel = require('../models/user');
    const AddressModel = require('../models/project');
    const uuid = global.uuid;

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

    const getProjects = function (req, res) {
        
    };

    return {
        register: register,
        login: login
    }

})();