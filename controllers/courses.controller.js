const { validationResult } = require('express-validator')
const Course = require('../models/course.model')
const httpStatusTexts = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const AppError = require('../utils/appError');
const appError = require('../utils/appError');


const getAllCourses = async (req, res) => {
    const query = req.query;
    console.log(query)
    const limit = query.limit || 5;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const courses = await Course.find({}, { "__v": false }).limit(limit).skip(skip);
    res.json({ status: httpStatusTexts.SUCCESS, data: { courses } })
    res.end();
}
const getCourse = asyncWrapper(async (req, res, next) => {
    let course;
    course = await Course.findById(req.params.courseid)
    if (!course) {
        const error = appError.create("Not Found", 404, httpStatusTexts.FAIL)
        return next(error)
    }
    res.json({ status: httpStatusTexts.SUCCESS, data: { course } })
    res.end();
})

const addCourse = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = appError.create(errors.array(), 400, httpStatusTexts.ERROR)
        return next(error)
    }

    const newCourse = new Course(req.body)
    await newCourse.save();

    res.json({ status: httpStatusTexts.SUCCESS, data: { newCourse } })
    res.end()
})


const updateCourse =  asyncWrapper( async (req, res) => {
    const courseId = req.params.courseId
    const UpdatedCourse = await Course.updateOne({ _id: courseId, }, { $set: { ...req.body } })
    console.log(UpdatedCourse)
    res.status(200).json({ status: httpStatusTexts.SUCCESS, data: { UpdatedCourse } })
})

const deleteCourse = asyncWrapper( async (req, res) => {
    const courseID = req.params.courseid
    await Course.deleteOne({ _id: courseID })
    const courses = await Course.find()
    res.json({ status: httpStatusTexts.SUCCESS, data: { courses } })
    res.end()
})

module.exports = {
    getAllCourses, getCourse, addCourse, updateCourse, deleteCourse
}