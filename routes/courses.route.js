const express = require('express')
const coursesController = require('../controllers/courses.controller')
const validationSchema = require('../validations/validationSchema.middleware');
const verifyToken = require('../middlewares/verifyToken');
const userRoles = require('../utils/userRoles');
const allowedTo = require('../middlewares/allowedTo')
const router = express.Router();

router.route('/:courseid')
    .get(coursesController.getCourse)
    .patch(coursesController.updateCourse)
    .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), coursesController.deleteCourse)


router.route('/')
    .get(coursesController.getAllCourses)
    .post(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), validationSchema.postValidationSchema(), coursesController.addCourse)


module.exports = router;