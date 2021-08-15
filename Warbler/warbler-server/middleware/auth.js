// require('dotenv').load();
const jwt = require('jsonwebtoken');
let token;
// authentication
exports.loginRequired = function(req, res, next) {
    try {
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }
        else {
            return next({
                status: 401,
                message: "Unauthorized"
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, function verifyToken(err, decoded) {
            if (err) {
                return next(err);
            }
            if (decoded) {
                return next();
            }
            else {
                return next({
                    status: 400,
                    message: "Please log in first"
                });
            }
        })
    }
    catch (err) {
        next(err);
    }

};

// authorizarion
exports.ensureCorrectUser = function(req, res, next) {
    let token;
    try {
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }
        else {
            return next({
                status: 401,
                message: "Unauthorized"
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, function verifyToken(err, decoded) {
            if (err) {
                return next(err);
            }
            if (decoded && decoded.id === req.params.id) {
                return next();
            }
            else {
                return next({
                    status: 401,
                    message: "Unauthorized"
                });
            }
        })
    }
    catch (err) {
        return next(err);
    }
};
