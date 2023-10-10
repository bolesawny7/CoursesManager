const { body } = require('express-validator')
const postValidationSchema = () => [
    body('title')
        .notEmpty()
        .withMessage("title is required")
        .isLength({ min: 2 })
        .withMessage("title at least is 2"),
    body('price')
        .notEmpty()
        .withMessage("every course must have a price")
]

module.exports = { postValidationSchema };