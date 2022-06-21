const sql = require("./db.js");

// constructor

const Finca = function(finca) {

  this.nombre = finca.nombre;
  this.direccion = finca.direccion;
  this.ide_propietario = finca.ide_propietario;
  this.tamano = finca.tamano;

};

//Método para extraer el histórico de fincas

Finca.getAll = result => {
    
    sql.query("SELECT * FROM nace_fincas", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("fincas: ", res);
      result(null, res);
    });

};

module.exports = Finca;