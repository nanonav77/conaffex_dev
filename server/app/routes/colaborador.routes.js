
module.exports = app => {
    
    const colaboradores = require("../controllers/colaborador.controller.js");
    
    var router = require("express").Router();
    
    // Crear un nuevo colaborador
    router.post("/crear", colaboradores.create);

    // Ruta para extracción de todos los colaboradores
    router.get("/total", colaboradores.getAllColaboradores);

    app.use('/api/colaboradores', router);
};