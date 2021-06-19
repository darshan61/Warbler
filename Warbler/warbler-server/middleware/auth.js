// require('dotenv').load();
const jwt = require('jsonwebtoken');

// authentication
exports.loginRequired = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Bearer token
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
    try {
        const token = req.headers.authorization.split(" ")[1];
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
