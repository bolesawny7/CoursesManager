const express = require('express')
const usersController = require('../controllers/users.controller')
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router();
const multer = require('multer');
const appError = require('../utils/appError');
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("File: ", file);
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const extention = file.mimetype.split('/')[1];
        const filename = `user_${Date.now()}.${extention}`
        cb(null, filename)
    }
})
const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.split('/')[0];
    if (fileType == "image") {
        cb(null, true)
    }
    else {
        return cb(appError.create("this file type is not supported, the file must be an image", 400), false)
    }
}
//filefilter is a function to check the file uploaded is under supervision with a rule we put
const upload = multer({ storage: diskStorage, fileFilter})

router.route('/')
    .get(verifyToken, usersController.getAllUsers)

router.route('/login')
    .post(usersController.login)

router.route('/register')
    .post(upload.single('avatar'), usersController.register)

module.exports = router;