const cloudinary = require('cloudinary').v2;
const Cours = require('../models/cours.model');
const fs = require('fs'); // Nécessaire pour le nettoyage des fichiers
const multer = require('multer');
exports.createCours = async (req, res) => {
    try {
        // Validation des données
        const { title, description, user } = req.body;
        if (!title || !description || !user) {
            return res.status(400).json({ message: "Données manquantes" });
        }

        let fileLink = {};

        // Téléchargement sur Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "cours",
                resource_type: "auto" // Permet de gérer les différents types de fichiers (pdf, vidéo)
            });
            fileLink = {
                public_id: result.public_id,
                url: result.secure_url,
                format: result.format // format du fichier téléchargé
            };

            // Nettoyage du fichier temporaire
            fs.unlinkSync(req.file.path);
        }

        const newCoursData = { title, description, file: fileLink, user };
        const newCours = await Cours.create(newCoursData);

        res.status(201).json({ success: true, cours: newCours });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err });
    }
};


exports.generateSignedUrl = async (req, res) => {
    try {
        const { publicId } = req.body;
        if (!publicId) {
            return res.status(400).json({ message: "publicId is required" });
        }

        const url = cloudinary.url(publicId, {
            sign_url: true,
            secure: true,
            expires_at: Math.floor(Date.now() / 1000) + 3600, // URL expirera dans une heure
        });

        res.status(200).json({ url });
    } catch (err) {
        console.error("Error generating signed URL:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Autres méthodes pour lire, mettre à jour, supprimer des cours...
exports.editCours = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        let fileLink = {};

        if (req.file) {
            // Supprimez l'ancien fichier de Cloudinary ici si nécessaire
            const cours = await Cours.findById(id);
            if (cours.file && cours.file.public_id) {
                await cloudinary.uploader.destroy(cours.file.public_id);
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "cours",
                resource_type: "auto"
            });
            fileLink = {
                public_id: result.public_id,
                url: result.secure_url,
                format: result.format
            };

            // Nettoyage du fichier temporaire
            fs.unlinkSync(req.file.path);
        }

        const updatedCours = await Cours.findByIdAndUpdate(id, {
            title,
            description,
            ...(req.file && { file: fileLink }),
        }, { new: true });

        if (!updatedCours) {
            return res.status(404).json({ message: "Cours not found" });
        }

        res.status(200).json(updatedCours);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCours = async (req, res) => {
    try {
        const coursId = req.params.id;
        if (!coursId) {
            return res.status(400).json({ message: 'ID de cours manquant' });
        }

        const deletedCours = await Cours.findByIdAndDelete(coursId);
        if (!deletedCours) {
            return res.status(404).json({ message: 'Cours non trouvé' });
        }

        res.status(200).json({ message: 'Cours supprimé avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur du serveur', error: err });
    }
};

exports.getCours = async (req, res) => {
  try {
      const { id } = req.params;
      const cours = await Cours.findById(id);

      if (!cours) {
          return res.status(404).json({ message: "Cours not found" });
      }

      res.status(200).json(cours);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

exports.getCoursByUser = async (req, res) => {
  try {
      const { userId } = req.params;
      const cours = await Cours.find({ user: userId });

      res.status(200).json(cours);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

exports.getAllCours = async (req, res) => {
    try {
        const cours = await Cours.find({});
        res.status(200).json(cours);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage }).single('file');

exports.createCoursMulter = async (req, res) => {
    try {
        console.log(req.files.file[0].path);
       console.log(req.files.image[0].path);
        //console.log(req.file.path);
        // Validation des données
        const { title, description, user } = req.body;
        if (!title || !description || !user) {
            return res.status(400).json({ message: "Données manquantes" });
        }
        if (!req.files.file[0].path) {
            return res.status(400).json({ message: "Fichier manquant" });
        }
        // Configuration pour le téléchargement de fichiers
       
        let fileLink = {
            public_id: "1",
            url: req.files.file[0].path,
            format: "pdf" // format du fichier téléchargé
        };
       


        const newCoursData = { title, description, file: fileLink, user,image:req.files.image[0].path };
        const newCours = await Cours.create(newCoursData);

        res.status(201).json({ success: true, cours: newCours });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err });
    }
};