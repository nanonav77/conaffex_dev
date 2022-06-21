// ESTABLECEMOS LOS CONTROLADORES DEL API USUARIO

const Usuario = require("../models/usuario.model.js");

/// Funcion para realizar la validacion de ingreso de un usuario

exports.validateUser = (req, res) => {
    
    const email = req.query.email;
    const pass = req.query.pass;

    Usuario.validateUser(email,pass, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Usuario no encontrado con email: ${email}.`
            });
          } else {
            res.status(500).send({
              message: "Error al validar al usuario con email: " + email
            });
          }
        } else res.send(data);
    });
  
};