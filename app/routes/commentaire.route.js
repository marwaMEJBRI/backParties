const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/Commentaire.controller');

// Route pour créer un nouveau stage
router.route('/newCommentaire').post(commentaireController.postCommentaire);

// Route pour récupérer tous les stages
router.route('/commentaires').get(commentaireController.getCommentaire);

module.exports = router;
