const User = require("../models/user.model");


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };


  // exports.getAllEtudiants = (req, res) => {
  //   Role.findOne({ name: "etudiant" })
  //     .then(role => {
  //       if (!role) {
  //         return res.status(404).send({ message: "Role 'etudiant' not found" });
  //       }
  //       User.find({ roles: role._id })
  //         .populate("roles", "-__v")
  //         .then(users => {
  //           res.status(200).send(users);
  //         })
  //         .catch(err => {
  //           res.status(500).send({ message: err });
  //         });
  //     })
  //     .catch(err => {
  //       res.status(500).send({ message: err });
  //     });
  // };
  exports.getAllUsers = (req, res) => {
    User.find()
      .populate("roles", "-__v")
      .then(users => {
        res.status(200).send(users);
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "An error occurred while retrieving users." });
      });
  };
  
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().populate("roles", "-__v");
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message || "An error occurred while retrieving users." });
    }
  };
  
  exports.getSingleUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("roles", "-__v");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message || "An error occurred while retrieving the user." });
    }
  };
  