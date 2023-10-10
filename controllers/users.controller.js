const asyncWrapper = require('../middlewares/asyncWrapper')
const User = require('../models/user.model');
const appError = require('../utils/appError');
const httpStatusTexts = require('../utils/httpStatusText');
const bcrypt = require('bcryptjs')
const generateJWT = require('../utils/generateJWT')

const getAllUsers = asyncWrapper(async (req, res, next) => {

    const query = req.query;
    const limit = query.limit || 5;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const users = await User.find({}, { "__v": false, "password": false }).limit(limit).skip(skip);
    res.json({ status: httpStatusTexts.SUCCESS, data: { users } })
    res.end();
})

const register = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body
    const oldUser = await User.findOne({ email: email })
    if (oldUser) {
        const error = appError.create("User already exists", 404, httpStatusTexts.FAIL)
        return next(error)
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        firstName, 
        lastName, 
        email, 
        password: hashedPassword, 
        role, 
        avatar: req.file.filename
    })

    const token = await generateJWT({ email: newUser.email, id: newUser.id, role: newUser.role })

    newUser.token = token;
    await newUser.save();

    res.status(201).json({ status: httpStatusTexts.SUCCESS, data: { newUser } })
    res.end()
})

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && !password) {
        const error = appError.create("email and Password are required", 400, httpStatusTexts.FAIL)
        return next(error)
    }
    const user = await User.findOne({ email: email });

    if (!user) {

        const error = appError.create("User Not Found", 400, httpStatusTexts.FAIL)
        return next(error);
    }

    const matchedPassword = await bcrypt.compare(password, user.password)

    if (user && matchedPassword) {
        const token = await generateJWT({ email: user.email, id: user.id, role: user.role })
        res.status(200).json({ status: httpStatusTexts.SUCCESS, data: { msg: "logged in successfully", token: token, user } })
        res.end()
    }
    else {
        const error = appError.create("email or password is wrong", 400, httpStatusTexts.FAIL)
        return next(error);
    }
})



module.exports = {
    getAllUsers, register, login
}