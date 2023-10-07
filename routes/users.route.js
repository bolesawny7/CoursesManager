const express = require('express')
const usersController = require('../controllers/users.controller')
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router();

router.route('/')
    .get(verifyToken,usersController.getAllUsers)

router.route('/login')
    .post(usersController.login)

router.route('/register')
    .post(usersController.register)

module.exports = router;