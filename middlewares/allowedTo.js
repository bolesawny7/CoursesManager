const appError = require("../utils/appError");
const httpStatusTexts = require('../utils/httpStatusText')
module.exports = (...roles) => {
    return (req, res, next) => {
        // this is the currentUser passed from the verifyToken function in the middleware before this middleware
        //remove the comment and run the delete course api and check the console
        // console.log(req.currentUser.role)

        if (!roles.includes(req.currentUser.role)) {
            return next(appError.create("This Role is Not Authorized", 401, httpStatusTexts.ERROR))
        }

        next();
    }
}