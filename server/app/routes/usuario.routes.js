module.exports = app => {
    
    const usuarios = require("../controllers/usuario.controller.js");
    
    var router = require("express").Router();
    
    // Ruta para validación del inicio de sesión de un usuario
    router.get("/validate", usuarios.validateUser);

    app.use('/api/usuarios', router);
};