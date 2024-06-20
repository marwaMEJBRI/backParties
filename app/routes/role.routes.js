const { getAllRoles } = require('../controllers/role.controller'); // adjust the path to your roleController file



module.exports = function (app){
app.get("/api/roles", getAllRoles);
}