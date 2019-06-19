const express = require("express");
const validation = require("../middleware/validation");
const authAdmin = require("../middleware/authentication.admin");
const AdminController = require("../controller/controller.admin");

const router = express.Router();

/**
 * @route GET api/admin
 * @desc Retrieve all admins.
 * @access Public.
 */
router.get("/", (req, res) => {

    AdminController
        .getAllAdmins()
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err))

});

/**
 * @route GET api/admin
 * @desc Retrieve an admin from given email.
 * @access Public.
 */
router.get("/:email", (req, res) => {

    AdminController
        .getAdminByEmail(req.params.email)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err))

});

/**
 * @route GET api/admin
 * @desc Retrieve an admin from given ID.
 * @access Public.
 */
router.get("/:id", (req, res) => {

    AdminController
        .getAdminById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err))

});

/**
 * @route POST api/admin
 * @desc Create an admin.
 * @access Private.
 */
router.post('/', authAdmin, validation, (req, res) => {

    AdminController
        .createAdmin(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err))

});

/**
 * @route PUT api/admin
 * @desc Update an admin from given ID.
 * @access Private.
 */
router.put('/:id', authAdmin, validation, (req, res) => {

    AdminController
        .updateAdminById(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err))

});

/**
 * @route DELETE api/admin
 * @desc Delete an admin from given ID.
 * @access Public.
 */
router.delete('/:id', (req, res) => {

    AdminController
        .deleteAdminById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err))

});

module.exports = router;