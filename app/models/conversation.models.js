// const mongoose = require("mongoose");

// const conversationSchema = new mongoose.Schema(
//   {
//     creatorId: {
//       type: String,
//       required: true,
//     },
//     participantId: {
//       type: String,
//       required: true,
//     },
//     chatPartner: {
//       type: Object,
//       required: true,
//     },
//     chatCreator: {
//       type: Object,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Conversation = mongoose.model("Conversations", conversationSchema);

// module.exports = Conversation;
const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chatPartner: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    chatCreator: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;

