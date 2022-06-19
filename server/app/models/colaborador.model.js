const sql = require("./db.js");

// Constructor Colaborador

const Colaborador = function(colaborador) {

  this.numero = colaborador.numero;
  this.nombre = colaborador.nombre;
  this.identificacion = colaborador.identificacion;
  this.telefono = colaborador.telefono;
  this.email = colaborador.email;
  this.estado = colaborador.estado;

};

// Declaramos el método que permite ingresar un nuevo colaborador

Colaborador.create = (newColaborador, result) => {
    
    sql.query("INSERT INTO nace_colaboradores SET ?", newColaborador, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created tutorial: ", { id: res.insertId, ...newColaborador });
      result(null, { id: res.insertId, ...newColaborador });
    });
};

// Declaramos el método que permite consultar un colaborador según su número ID

Colaborador.findById = (numeroID, result) => {
    
    sql.query(`SELECT * FROM nace_colaboradores WHERE numero = ${numeroID}`, (err, res) => {
      
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
        
        result({ kind: "Colaborador no existe" }, null);
    
    });
};

// Declaramos el método para obtener la lista completa de los colaboradores

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

// Declaramos el método para actualizar un determinado colaborador

Colaborador.updateById = (numero, colaborador, result) => {

    sql.query(
      "UPDATE nace_colaboradores SET nombre = ?, identificacion = ?, telefono = ?, email = ?, estado = ? WHERE id = ?",
      [colaborador.nombre, colaborador.identificacion, colaborador.telefono,colaborador.email,colaborador.estado, numero],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          
          result({ kind: "colaborador no encontrado" }, null);
          return;
        }
        console.log("colaborador actualizado: ", { numero: numero, ...colaborador });
        result(null, { numero: numero, ...colaborador });
      }
    );

};

module.exports = Colaborador;