
module.exports = app => {
    
    const fincas = require("../controllers/finca.controller.js");
    
    var router = require("express").Router();
    
    // Ruta para extracción de todas las fincas
    router.get("/total", fincas.getAllFincas);

    app.use('/api/fincas', router);
};