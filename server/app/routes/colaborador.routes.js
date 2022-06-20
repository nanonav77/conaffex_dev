
module.exports = app => {
    
    const colaboradores = require("../controllers/colaborador.controller.js");
    
    var router = require("express").Router();
    
    // Ruta para crear un nuevo colaborador
    router.post("/crear", colaboradores.create);

    // Ruta para extracción de todos los colaboradores
    router.get("/total", colaboradores.getAllColaboradores);

    // Ruta para extracción de un determinado colaborador
    router.get("/:numero", colaboradores.getOneColaborador);

    // Ruta para actualización de un determinado colaborador
    router.put("/:numero", colaboradores.update);

    app.use('/api/colaboradores', router);
};