const sql = require("./db.js");

// constructor

const Colaborador = function(colaborador) {

  this.nombre = colaborador.nombre;
  this.identificacion = colaborador.identificacion;
  this.telefono = colaborador.telefono;
  this.email = colaborador.email;
  this.estado = colaborador.estado;

};

//Método para extraer el histórico de colaboradores

Colaborador.getAll = result => {
  sql.query("SELECT * FROM nace_colaboradores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("colaboradores: ", res);
    result(null, res);
  });
};

//Método para la creacion de un nuevo colaborador

Colaborador.create = (newColaborador, result) => {
  sql.query("INSERT INTO nace_colaboradores SET ?", newColaborador, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("colaborador creado: ", { numero: res.insertId, ...newColaborador });
    result(null, { numero: res.insertId, ...newColaborador });
  });
};

module.exports = Colaborador;