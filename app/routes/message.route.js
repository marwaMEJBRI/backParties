// const express = require("express");
// const { getMessage, postMessage } = require("../controllers/message.controller.js");
// const { verifyToken } = require("../utils/varifyUser.js");

// const router = express.Router();

// router.get("/", verifyToken, getMessage);
// router.post("/create", verifyToken, postMessage);

// module.exports = router;
const express = require("express");
const { verifyToken } = require("../middlewares/authJwt");
const { getMessage,postMessage} = require("../controllers/message.controller");

const router = express.Router();

router.get("/", getMessage);
router.post("/create", postMessage);

module.exports = router;
