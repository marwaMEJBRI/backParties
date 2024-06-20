// const express = require("express");
// const { getConversation, createConversation, deleteConversation } = require("../controllers/conversation.controller.js");
// const { verifyToken } = require("../utils/varifyUser.js");

// const router = express.Router();

// router.get("/:id", verifyToken, getConversation);
// router.post("/create", verifyToken, createConversation);
// router.delete("/delete/:chatId", deleteConversation);

// module.exports = router;
const express = require("express");
const { verifyToken } = require("../middlewares/authJwt");
const {
  createConversation,
  getConversations,
  deleteConversation
} = require("../controllers/conversation.controller");

const router = express.Router();

router.get("/:id", verifyToken, getConversations);
router.post("/create", verifyToken, createConversation);
router.delete("/delete/:chatId", deleteConversation);

module.exports = router;
