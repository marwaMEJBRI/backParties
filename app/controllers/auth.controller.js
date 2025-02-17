    const config = require("../config/auth.config");
    const db = require("../models");
    const User = db.user;
    const Role = db.role;

    var jwt = require("jsonwebtoken");
    var bcrypt = require("bcryptjs");

    // exports.signup = (req, res) => {
    //   const user = new User({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: bcrypt.hashSync(req.body.password, 8)
    //   });

    //   user.save()
    //     .then(savedUser => {
    //       if (req.body.roles) {
    //         return Role.find({
    //           name: { $in: req.body.roles }
    //         }).then(roles => {
    //           savedUser.roles = roles.map(role => role._id);
    //           return savedUser.save();
    //         });
    //       } else {
    //         return Role.findOne({ name: "user" }).then(role => {
    //           savedUser.roles = [role._id];
    //           return savedUser.save();
    //         });
    //       }
    //     })
    //     .then(() => {
    //       res.send({ message: "User was registered successfully!" });
    //     })
    //     .catch(err => {
    //       console.error('Error during signup:', err);

    //       res.status(500).send({ message: err });
    //     });
    // };

    exports.signup = (req, res) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      });

      user.save()
        .then(savedUser => {
          if (req.body.roles) {
            return Role.find({ name: { $in: req.body.roles } })
              .then(roles => {
                if (!roles.length) {
                  throw new Error("Roles not found");
                }
                savedUser.roles = roles.map(role => role._id);
                return savedUser.save();
              });
          } else {
            return Role.findOne({ name: "etudiant" })
              .then(role => {
                if (!role) {
                  throw new Error("Default role 'user' not found");
                }
                savedUser.roles = [role._id];
                return savedUser.save();
              });
          }
        })
        .then(() => {
          res.send({ message: "User was registered successfully!" });
        })
        .catch(err => {
          console.error('Error during signup:', err.message || err);
          if (err.message === "Roles not found" || err.message === "Default role 'user' not found") {
            res.status(404).send({ message: err.message });
          } else {
            res.status(500).send({ message: "An error occurred while registering the user" });
          }
        });
    };

    exports.signin = (req, res) => {
      User.findOne({
        username: req.body.username
      })
        .populate("roles", "-__v")
        .then(user => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }

          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );

          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }

          const token = jwt.sign({ id: user.id }, config.secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
          });

          var authorities = [];

          for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
        })
        .catch(err => {
          res.status(500).send({ message: "An error occurred while signing in" });
        });
    };
