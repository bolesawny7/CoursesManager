const express = require('express')
const coursesController = require('../controllers/courses.controller')
const validationSchema = require('../middlewares/validationSchema.middleware')

const router = express.Router();

router.route('/:courseid')
    .get(coursesController.getCourse)
    .patch(coursesController.updateCourse)
    .delete(coursesController.deleteCourse)


router.route('/')
    .get(coursesController.getAllCourses)
    .post(validationSchema.postValidationSchema(), coursesController.addCourse)


module.exports = router;