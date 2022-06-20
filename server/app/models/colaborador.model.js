const sql = require("./db.js");

// constructor

const Colaborador = function(colaborador) {

  this.nombre = colaborador.nombre;
  this.identificacion = colaborador.identificacion;
  this.telefono = colaborador.telefono;
  this.email = colaborador.email;
  this.estado = colaborador.estado;
  this.cuenta = colaborador.cuenta;

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

//Método para extraer un determinado colaborador según su numero (id)

Colaborador.getOneColaborador = (numero, result) => {
  
  sql.query(`SELECT * FROM nace_colaboradores WHERE numero = ${numero}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Colaborador encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }
    
    result({ kind: "No se encontró el colaborador con dicho ID" }, null);
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

//Método para la actualización de un colaborador determinado

Colaborador.updateById = (numero, colaborador, result) => {
  
  sql.query(
    "UPDATE nace_colaboradores SET nombre = ?, identificacion = ?, telefono = ?, email = ?, estado = ?, cuenta = ? WHERE numero = ?",
    [colaborador.nombre, colaborador.identificacion, colaborador.telefono,colaborador.email, colaborador.estado, colaborador.cuenta, numero],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Colaborador actualizado: ", { numero: numero, ...colaborador });
      result(null, { numero: numero, ...colaborador });
    }
  );

};

module.exports = Colaborador;