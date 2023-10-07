// function to verify the token went through the headers
const httpStatusTexts = require('../utils/httpStatusText')
const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization']

    if (!authHeader) {
        const error = appError.create("token is required", 401,httpStatusTexts.ERROR )
        return next(error);
    }
    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("token", decodedToken)
        next()
    } catch (err) {
        const error = appError.create("invalid Token", 401,httpStatusTexts.ERROR )
        return next(error);
    }
}

module.exports = verifyToken