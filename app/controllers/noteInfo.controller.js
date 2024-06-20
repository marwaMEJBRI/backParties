// Dans votre fichier controller, par exemple, noteInfoController.js

const NoteInfo = require('../models/noteInfo.model'); // Assurez-vous que le chemin est correct

exports.getAllNoteInfos = async (req, res) => {
    try {
        const noteInfos = await NoteInfo.find().populate('relatedRecordId');
        res.status(200).json(noteInfos);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des noteInfos", error });
    }
};
exports.getNoteInfoById = async (req, res) => {
    try {
        const noteInfoId = req.params.id;
        const noteInfo = await NoteInfo.findById(noteInfoId).populate('relatedRecordId');
        if (!noteInfo) {
            return res.status(404).json({ message: "NoteInfo non trouvée" });
        }
        res.status(200).json(noteInfo);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la noteInfo", error });
    }
};
exports.updateNoteInfoStatus = async (req, res) => {
    try {
        const noteInfoId = req.params.id;
        const updatedStatus = req.body.status; // Assurez-vous que le statut est envoyé dans le corps de la requête

        const noteInfo = await NoteInfo.findByIdAndUpdate(noteInfoId, { status: updatedStatus }, { new: true });
        if (!noteInfo) {
            return res.status(404).json({ message: "NoteInfo non trouvée" });
        }
        res.status(200).json(noteInfo);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la noteInfo", error });
    }
};
// Dans noteInfoController.js

exports.deleteNoteInfo = async (req, res) => {
    try {
        const noteInfoId = req.params.id;
        const noteInfo = await NoteInfo.findByIdAndDelete(noteInfoId);

        if (!noteInfo) {
            return res.status(404).json({ message: "NoteInfo non trouvée" });
        }

        res.status(200).json({ message: "NoteInfo supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la noteInfo", error });
    }
};

exports.createNoteInfo = async (req, res) => {
    try {
        const noteInfoData = req.body; // Assurez-vous que les données de noteInfo sont envoyées dans le corps de la requête POST

        // Créez une nouvelle instance de NoteInfo avec les données fournies
        const newNoteInfo = new NoteInfo(noteInfoData);

        // Enregistrez la nouvelle noteInfo dans la base de données
        const savedNoteInfo = await newNoteInfo.save();

        res.status(201).json(savedNoteInfo);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la noteInfo", error });
    }
};
exports.getNoteInfoCount = async (req, res) => {
    try {
        // Compter toutes les noteInfos sans filtrer par statut
        const count = await NoteInfo.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors du comptage des noteInfos", error });
    }
};

