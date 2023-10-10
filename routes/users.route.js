const express = require('express')
const usersController = require('../controllers/users.controller')
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router();
const upload = require('../utils/imageUpload')

router.route('/')
    .get(verifyToken, usersController.getAllUsers)

router.route('/login')
    .post(usersController.login)

router.route('/register')
    .post(upload.single('avatar'), usersController.register)

module.exports = router;