// ESTABLECEMOS LOS CONTROLADORES DEL API FINCA

const Finca = require("../models/finca.model.js");

/// Funcion para extraer todas las fincas

exports.getAllFincas = (req, res) => {
    
    Finca.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Ha ocurrido algún error al extraer los colaboradores."
          });
        else res.send(data);
    });
  
};