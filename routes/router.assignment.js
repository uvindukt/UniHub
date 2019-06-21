const express = require("express");
const fileUpload = require("express-fileupload");
const AssignmentController = require("../controller/controller.assignment");

const router = express.Router();

router.use(fileUpload({ createParentPath: true }));

/**
 * @route GET api/assignment
 * @desc Retrieve all admins.
 * @access Public.
 */
router.post("/", (req, res) => {

    const { files } = req;

    if (files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    AssignmentController(files.file)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err))

});

module.exports = router;