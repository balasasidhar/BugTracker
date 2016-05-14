/**
 * Created by SASi on 14-May-16.
 */

module.exports = (function () {

    const index = function (req, res) {
        res.render("index");
    };

    const templates = function (req, res) {
        var name = req.params.name;
        res.render('tmpl/' + name);

    };

    return {
        index: index,
        templates: templates
    }

})();