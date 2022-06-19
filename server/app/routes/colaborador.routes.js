
module.exports = app => {
    
    const colaboradores = require("../controllers/colaborador.controller.js");
    
    var router = require("express").Router();
    
    // Crear un nuevo colaborador    
    router.post('/', function(req, res){
        colaboradores.create
    });
    
    // Obtener todos los colaboradores
    router.get('/lista', function(req, res){
        colaboradores.getAll
    });
    
    // Obtener colaborador por ID
    router.get('/:numero', function(req, res){
        colaboradores.findById
    });
    
    // Actualizar colaborador
    router.get('/:numero', function(req, res){
        colaboradores.updateById
    });
    
    app.use('/api/colaboradores', router);
};