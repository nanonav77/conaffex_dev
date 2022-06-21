const sql = require("./db.js");

// constructor

const Usuario = function(usuario) {

  this.identificacion = usuario.identificacion;
  this.nombre_usuario = usuario.nombre_usuario;
  this.apellidos_usuario = usuario.apellidos_usuario;
  this.rol_usuario = usuario.rol_usuario;
  this.email = usuario.email;
  this.contrasena = usuario.contrasena;

};

//Método realizar la autenticación de un usuario

Usuario.validateUser = (email, pass, result) => {
    
    sql.query(`SELECT * FROM nace_usuarios WHERE email = '${email}' and contrasena = '${pass}' `, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("usuario encontrado: ", res[0]);
          result(null, res[0]);
          return;
        }
        
        result({ kind: "usuario no encontrado" }, null);
    });

};

module.exports = Usuario;