const Notifications = require("../models/notifmessage.model.js");
const { verifyToken } = require("../middlewares/authJwt");

// Create Notification
const createNotification = async (req, res, next) => {
  try {
    const { from } = req.body;

    const existingNotification = await Notifications.findOne({ from });

    if (existingNotification) {
      return next(throwError(403, "Notification already exists"));
    } else {
      const createdNotification = await Notifications.create(req.body);
      res.status(201).json({
        message: "Notification created successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Get Notification
const getNotification = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(throwError(401, "User unauthorized!"));
  }
  try {
    const notification = await Notifications.find({ to: req.params.id });
    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

// Delete Notification
const deleteNotification = async (req, res, next) => {
  try {
    const dltNotification = await Notifications.deleteOne({
      from: req.params.id,
    });
    res.status(202).json("Notification deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNotification,
  getNotification,
  deleteNotification,
};
