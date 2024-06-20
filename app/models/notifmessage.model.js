// const mongoose = require("mongoose");

// const notifmessageSchema = new mongoose.Schema(
//   {
//     message: {
//       type: String,
//       required: true,
//     },
//     chatId: {
//       type: String,
//       required: true,
//     },
//     from: {
//       type: String,
//       required: true,
//     },
//     to: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Notifmessage = mongoose.model("Notifmessage", notifmessageSchema);

// module.exports = Notifmessage;
const mongoose = require("mongoose");

const NotifmessageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  isRead: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

const Notifmessage = mongoose.model("Notifmessage", NotifmessageSchema);

module.exports = Notifmessage;