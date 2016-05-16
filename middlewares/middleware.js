/**
 * Created by SASi on 16-May-16.
 */

module.exports = (function () {

    const jwt = global.jwt;

    const api_middleware = function (req, res, next) {
        var cookies = req.cookies;

        var url = req.originalUrl;

        if (url == "/api/user/register" || url == "/api/user/login" || url == "/api/report")
            next();

        else if (!cookies) {
            res.status(400).json({err: "unauthorized access"})
        } else {
            var token = cookies.auth_token;
            if (!token) {
                res.status(400).json({err: "unauthorized access"})
            } else {
                req.headers["authorization"] = "Bearer " + token;
                next();
            }
        }
    };
    return ({api_middleware: api_middleware});
})();