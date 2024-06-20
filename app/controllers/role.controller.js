const Role = require("../models/role.model"); // adjust the path to your Role model file

exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({});
    
    res.status(200).json({
      success: true,
      roles
    });
  } catch (err) {
    next(err);
  }
};