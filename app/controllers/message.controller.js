// const Message = require("../models/message.models.js");
// const { throwError } = require("../utils/error.js");

// const getMessage = async (req, res, next) => {
//   const sender = req.query.sender || "";
//   const receiver = req.query.receiver || "";

//   if (req.user.id != sender) return next(throwError(401, "Token unauthorized"));

//   try {
//     const messages = await Message.find({
//       $or: [
//         { $and: [{ sender }, { receiver }] },
//         { $and: [{ sender: receiver }, { receiver: sender }] },
//       ],
//     });
//     res.status(200).json(messages);
//   } catch (error) {
//     next(error);
//   }
// };

// const postMessage = async (req, res, next) => {
//   if (req.user.id != req.body.sender)
//     return next(throwError(401, "Token unauthorized"));
//   try {
//     const newMessage = new Message(req.body);
//     await newMessage.save();
//     res.status(201).json("Message sent successfully");
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   getMessage,
//   postMessage,
// };
const Message = require("../models/message.models");
const { verifyToken } = require("../middlewares/authJwt");

// const getMessage = async (req, res, next) => {
//   const sender = req.query.sender || "";
//   const receiver = req.query.receiver || "";

//   //if (req.userId != sender) return next(throwError(401, "Token unauthorized"));

//   try {
//     const messages = await Message.find({ sender, receiver })
//       .populate('sender', 'username email')
//       .populate('receiver', 'username email');

//     res.status(200).json(messages);
//   } catch (error) {
//     next(error);
//   }
// };

const getMessage = async (req, res, next) => {
  try {
    const messages = await Message.find()
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

const postMessage = async (req, res, next) => {
//  if (req.userId != req.body.sender)
    //return next(throwError(401, "Token unauthorized"));
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json("Message sent successfully");
  } catch (error) {
    next(error);
  }
};
module.exports = {
     getMessage,
      postMessage,
    };