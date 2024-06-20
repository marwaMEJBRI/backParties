const express = require('express');

const router = express.Router();
const coursController = require('../controllers/cours.controller');
const path = require('path');
const multer = require('multer');
// Configuration pour le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Créer un cours avec un support de cours
router.post('/new', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]), coursController.createCoursMulter);

// Obtenir tous les cours
router.get('/', coursController.getAllCours);

// Obtenir un cours spécifique par son ID
router.get('/:id', coursController.getCours);

// Mettre à jour un cours
router.put('/update/:id', upload.single('file'), coursController.editCours);

// Supprimer un cours
router.delete('/delete/:id', coursController.deleteCours);

// Obtenir tous les cours d'un utilisateur spécifique
router.get('/user/:userId', coursController.getCoursByUser);

// Générer une URL signée pour un fichier
router.post('/generateSignedUrl', coursController.generateSignedUrl);

module.exports = router;
