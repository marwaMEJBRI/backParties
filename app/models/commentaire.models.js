const mongoose = require("mongoose");

const CommentaireSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cour: { type: mongoose.Schema.Types.ObjectId, ref: "Cours" },
  content: String,
  timestamp: { type: Date, default: Date.now }
});

const Commentaire = mongoose.model("Commentaire", CommentaireSchema);

module.exports = Commentaire;
