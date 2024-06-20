// Dans votre fichier controller, par exemple, notificationController.js

const Notification = require('../models/notification.model'); // Assurez-vous que le chemin est correct

exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().populate('relatedRecordId');
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des notifications", error });
    }
};
exports.getNotificationById = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notification = await Notification.findById(notificationId).populate('relatedRecordId');
        if (!notification) {
            return res.status(404).json({ message: "Notification non trouvée" });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la notification", error });
    }
};
exports.updateNotificationStatus = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const updatedStatus = req.body.status; // Assurez-vous que le statut est envoyé dans le corps de la requête

        const notification = await Notification.findByIdAndUpdate(notificationId, { status: updatedStatus }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: "Notification non trouvée" });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la notification", error });
    }
};
// Dans notificationController.js

exports.deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notification = await Notification.findByIdAndDelete(notificationId);

        if (!notification) {
            return res.status(404).json({ message: "Notification non trouvée" });
        }

        res.status(200).json({ message: "Notification supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la notification", error });
    }
};

exports.createNotification = async (req, res) => {
    try {
        const notificationData = req.body; // Assurez-vous que les données de notification sont envoyées dans le corps de la requête POST

        // Créez une nouvelle instance de Notification avec les données fournies
        const newNotification = new Notification(notificationData);

        // Enregistrez la nouvelle notification dans la base de données
        const savedNotification = await newNotification.save();

        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la notification", error });
    }
};
exports.getNotificationCount = async (req, res) => {
    try {
        // Compter toutes les notifications sans filtrer par statut
        const count = await Notification.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors du comptage des notifications", error });
    }
};

