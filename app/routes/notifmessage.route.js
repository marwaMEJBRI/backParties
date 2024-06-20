// const express = require("express");
// const { createNotification, getNotification, deleteNotification } = require("../controllers/notifmessage.controller.js");
// const { verifyToken } = require("../utils/varifyUser.js");

// const router = express.Router();

// router.post("/create", createNotification);
// router.get("/:id", verifyToken, getNotification);
// router.delete("/delete/:id", deleteNotification);

// module.exports = router;

const express = require("express");
const { verifyToken } = require("../middlewares/authJwt");
const {
  createNotification,
  getNotification,
  deleteNotification
} = require("../controllers/notifmessage.controller");

const router = express.Router();

router.post("/create", verifyToken, createNotification);
router.get("/:id", verifyToken, getNotification);
router.delete("/delete/:id", verifyToken, deleteNotification);

module.exports = router;
