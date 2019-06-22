const express = require("express");
const fileUpload = require("express-fileupload");
const AssignmentController = require("../controller/controller.assignment");

const router = express.Router();

router.use(fileUpload({ createParentPath: true }));

/**
 * @route POST api/assignment
 * @desc Create a new assignment.
 * @access Public.
 */
router.post("/", (req, res) => {

    const { files } = req;

    if (files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

    AssignmentController
        .createAssignment(files.file, req.body)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err));

});

/**
 * @route GET api/assignment/course/{id}
 * @desc Get assignments of a course.
 * @access Public.
 */
router.get("/course/:id", (req, res) => {

    res.json({ msg: "hello" });

});

module.exports = router;