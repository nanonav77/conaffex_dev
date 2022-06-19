
const Colaborador = require("../models/colaborador.model.js");

// Funcion de obtener la lista completa de los colaboradores

exports.getAll = (req, res) => {

    Colaborador.getAll((err, data) => {
    
        if (err)
            res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving colaborador."
        
        });
        
        else res.send(data);
    });
};