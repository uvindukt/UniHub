const express = require('express');
const router = express.Router();
const CourseController = require('../controller/controller.course');
const InstructorController = require("../controller/controller.instructor");

/**
 * @desc Retrieve all courses.
 * @route GET /api/course
 * @access Private
 */
router.get('/', (req, res) => {

    CourseController
        .getAllCourses()
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err));

});

/**
 * @desc Retrieve courses from given ID.
 * @route GET /api/course/{id}
 * @access Private
 */
router.get('/:id', (req, res) => {

    CourseController
        .getCourseById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err));

});

/**
 * @desc Retrieve courses from given code.
 * @route GET /api/course/code/{code}
 * @access Private
 */
router.get('/code/:code', (req, res) => {

    CourseController
        .getCourseByCode(req.params.code)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err));

});

/**
 * @desc Add a new course.
 * @route POST /api/course
 * @access Private
 */
router.post('/', (req, res) => {

    InstructorController
        .getInstructorById(req.body.instructor)
        .then(result => {
            const { instructor } = result;
            CourseController
                .createCourse(req.body, instructor)
                .then( result => res.json(result))
                .catch(err => res.status(err.status).json(err));
        })
        .catch(err => res.status(err.status).json(err))

});

module.exports = router;