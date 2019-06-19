const express = require("express");
const router = express.Router();
const InstructorController = require("../controller/controller.instructor");

/**
 * @route POST api/instructor
 * @desc Create a new instructor.
 * @access Public.
 */
router.post('/', (req, res) => {

    InstructorController
        .createInstructor(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err));

});

module.exports = router;