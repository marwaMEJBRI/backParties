// const Conversation = require("../models/conversation.models.js");
// const { throwError } = require("../utils/error.js");

// const getConversation = async (req, res, next) => {
//   if (req.user.id !== req.params.id) {
//     return next(throwError(401, "user is not valid"));
//   }

//   try {
//     const userConversation = await Conversation.find({
//       $or: [{ creatorId: req.params.id }, { participantId: req.params.id }],
//     });
//     res.status(200).json(userConversation);
//   } catch (error) {
//     next(error);
//   }
// };

// const createConversation = async (req, res, next) => {
//   if (req.user.id != req.body.creatorId) {
//     return next(throwError(401, "user is not valid"));
//   }

//   if (req.body.creatorId === req.body.perticipantId) {
//     return next(throwError(402, "request error"));
//   }

//   try {
//     const conversations = await Conversation.find({
//       $or: [
//         {
//           $and: [
//             { creatorId: req.body.creatorId },
//             { participantId: req.body.participantId },
//           ],
//         },
//         {
//           $and: [
//             { creatorId: req.body.participantId },
//             { participantId: req.body.creatorId },
//           ],
//         },
//       ],
//     });

//     if (conversations.length === 0) {
//       const newConversation = new Conversation(req.body);
//       await newConversation.save();
//       res.status(201).json("conversation created successfully");
//     } else {
//       res.status(403).json("conversation already exists");
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteConversation = async (req, res, next) => {
//   const chatId = req.params.chatId;
//   try {
//     await Conversation.findByIdAndDelete(chatId);
//     res.status(204).json("conversation deleted successfully");
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   getConversation,
//   createConversation,
//   deleteConversation,
// };

const Conversation = require("../models/conversation.models");

const createConversation = async (req, res, next) => {
  const { participantId, chatPartner, chatCreator } = req.body;

  if (!participantId || !chatPartner || !chatCreator) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const conversation = new Conversation({
      creatorId: req.userId,
      participantId,
      chatPartner,
      chatCreator,
    });

    await conversation.save();
    res.status(201).json(conversation);
  } catch (err) {
    next(err);
  }
};




const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      $or: [
        { creatorId: req.userId },
        { participantId: req.userId }
      ]
    }).populate("creatorId", "username email")
      .populate("participantId", "username email");

    res.status(200).json(conversations);
  } catch (err) {
    next(err);
  }
};

const deleteConversation = async (req, res, next) => {
  const chatId = req.params.chatId;
  try {
    await Conversation.findByIdAndDelete(chatId);
    res.status(204).json("conversation deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConversations,
  createConversation,
  deleteConversation,
};