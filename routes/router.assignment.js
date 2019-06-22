const express = require("express");
const fileUpload = require("express-fileupload");
const AssignmentController = require("../controller/controller.assignment");

const router = express.Router();

router.use(fileUpload({ createParentPath: true }));

const GCSService = require("../service/service.storage");
const bucketName = "unihub-assignments";

/**
 * @route GET api/assignment
 * @desc Retrieve all admins.
 * @access Public.
 */
router.post("/", (req, res) => {

    const { files } = req;

    if (files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

    GCSService.uploadFileToGoogleCloudStorage(files.file)
        .then(() => res.json({ msg: "hello" }))
        .catch(err => res.status(500).json({ msg: "error", err }));

    /*AssignmentController
        .createAssignment(files.file, req.body)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err))*/

});

module.exports = router;