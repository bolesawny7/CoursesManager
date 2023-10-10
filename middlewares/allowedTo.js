const appError = require("../utils/appError");
const httpStatusTexts = require('../utils/httpStatusText')
module.exports = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return next(appError.create("This Role is Not Authorized", 401, httpStatusTexts.ERROR))
        }

        next();
    }
}