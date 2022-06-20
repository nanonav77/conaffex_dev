// ESTABLECEMOS LOS CONTROLADORES DEL API COLABORADOR

const Colaborador = require("../models/colaborador.model.js");

/// Funcion para extraer a todos los colaboradores

exports.getAllColaboradores = (req, res) => {
  Colaborador.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ha ocurrido algún error al extraer los colaboradores."
        });
      else res.send(data);
    });
};


/// Funcion para la creación de un nuevo colaborador

exports.create = (req, res) => {
  
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Creamos el colaborador nuevo
  const colaborador = new Colaborador({
    nombre: req.body.nombre,
    identificacion: req.body.identificacion,
    telefono: req.body.telefono,
    email: req.body.email,
    estado: req.body.estado
  });
  
  // Guardamos el colaborador nuevo
  Colaborador.create(colaborador, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido algún error al crear el colaborador."
      });
    else res.send(data);
  });
};