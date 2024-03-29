//import { dbConfig } from "/config/dbConfig.js";

// ---- DECLARAMOS LOS ELEMENTOS DEL DOM ----

var body = document.getElementsByTagName("body")[0];
body.addEventListener("load", init(), false);

const inputNombreAgregar    = document.getElementById('campoNombreAgregar');
const inputTamanoAgregar    = document.getElementById('campoTamanoAgregar');
const inputUbicacionAgregar = document.getElementById('campoUbicacionAgregar');

const selectorPropietarioAgregar = document.getElementById('selectorPropietarioAgregar');

const botonAgregar  = document.getElementById('buttonAgregar');
const botonCancelar = document.getElementById('buttonCancelar');

function dbConfig() {
    return "http://localhost:5000/";
}

// LLAMAMOS LA FUNCIÓN QUE TRAE LA LISTA DE POSIBLES
// PROPIETAROS EN EL MOMENTO QUE SE CREA LA VENTANA
function init() {

    const configDB = dbConfig();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', configDB + 'usuarios');
    xhr.responseType = 'json';
    xhr.send();

    xhr.onload = function() {
        let response = xhr.response;
        // AGREGAMOS LA LISTA DE PROPIETARIOS EN EL SELECTOR
        for (var i=0; i<response.length; i++) {

            var option = document.createElement("option");
            option.value = response[i].NUMERO;
            option.text = response[i].IDENTIFICACION +" - "+response[i].NOMBRE;            

            selectorPropietarioAgregar.add(option);
        
        };
    };
};

// DECLARAMOS LA FUNCIÓN QUE SE ENCARGA DE ALMACENAR UNA NUEVA FINCA
botonAgregar.addEventListener('click', function(){
       
    const configDB = dbConfig();

    const xhr = new XMLHttpRequest();
    xhr.open("POST", configDB + "finca");
    const body = JSON.stringify({"nombreCompleto": inputNombreAgregar.value, "tamano": inputTamanoAgregar.value, "ubicacion": inputUbicacionAgregar.value, "numeroPropietario": selectorPropietarioAgregar.value} );

    xhr.onload = () => {
    
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(JSON.parse(xhr.responseText));

        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };

    xhr.send(body);
});

// ACCIÓN PARA LIMPIAR LOS CAMPOS DE AGREGAR FINCA
botonCancelar.addEventListener('click', function(){
       
    inputNombreAgregar.value = "";
    inputTamanoAgregar.value = "";
    inputUbicacionAgregar.value = "";
   
});