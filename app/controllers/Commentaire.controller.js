
const Commentaire = require("../models/commentaire.models");
//const { verifyToken } = require("../middlewares/authJwt");

const getCommentaire = async (req, res, next) => {
    const cours = req.query.cours;
  console.log(cours);
    if (!cours) {
      return next(new Error("Cours doesn't exist"));
    }
  
    try {
      const commentaires = await Commentaire.find({ cour:cours }).populate("sender", "username email");
      res.status(200).json(commentaires);
    } catch (error) {
      next(error);
    }
  };

const postCommentaire = async (req, res, next) => {
  //if (!req.userId)
    //eturn next(throwError(401, "Token unauthorized"));
  try {
    const newCommentaire = new Commentaire(req.body);
    await newCommentaire.save();
    res.status(201).json("Commentaire sent successfully");
  } catch (error) {
    next(error);
  }
};
module.exports = {
    getCommentaire,
    postCommentaire,
    };