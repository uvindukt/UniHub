const express = require("express");
const router = express.Router();
const NotificationController = require("../controller/controller.notification");

/**
 * @route GET api/notification/{userId}
 * @desc Retrieve notifications for a user.
 * @access Public.
 */
router.get('/:userId', (req, res) => {

    NotificationController
        .getNotifications(req.params.userId)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err));

});

/**
 * @route DELETE api/notification/{notificationId}
 * @desc Delete notification from an ID.
 * @access Public.
 */
router.delete('/:id', (req, res) => {

    NotificationController
        .deleteNotification(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json(err));

});

module.exports = router;