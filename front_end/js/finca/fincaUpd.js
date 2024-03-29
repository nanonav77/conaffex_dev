//import { dbConfig } from "/config/dbConfig.js";

// ---- DECLARAMOS LOS ELEMENTOS DEL DOM ----

var body = document.getElementsByTagName("body")[0];
body.addEventListener("load", init(), false);

const inputFincasBuscar        = document.getElementById('inputBuscarFincas');
const inputNombreActualizar    = document.getElementById('campoNombreActualizar');
const inputTamanoActualizar    = document.getElementById('campoTamanoActualizar');
const inputUbicacionActualizar = document.getElementById('campoUbicacionActualizar');

const tablaFincas = document.getElementById("tablaUpdFincas");

const seccionActualizarFinca       = document.getElementById('seccionActualizarFinca');
const seccionTablaActualizarFinca  = document.getElementById('seccionTablaActualizarFinca');

const etiquetaNumeroFincaAct       = document.getElementById('etiquetaNumeroFinca');

const selectorPropietariosActualizar = document.getElementById('selectorPropietarioActualizar');

const botonActualizar = document.getElementById('buttonActualizar');
const botonAtras      = document.getElementById('buttonAtras');

function dbConfig() {
    return "http://localhost:5000/";
}

// LLAMAMOS LA FUNCIÓN QUE TRAE LA LISTA DE FINCAS
// EN EL MOMENTO QUE SE CREA LA VENTANA
function init() {

    const configDB = dbConfig();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', configDB + 'fincas');
    xhr.responseType = 'json';
    xhr.send();

    xhr.onload = function() {
        let response = xhr.response;
        setFincasTabla(response); 
    };
};

// DECLARAMOS FUNCION PARA COMPLETAR LA TABLA 
// CON LA LISTA DE COLABORADORES

function setFincasTabla(data){
    
    // LIMPIAMOS LA TABLA EN CADA LLAMADA DE ACTUALIZACIÓN
    while(tablaFincas.rows.length > 1) {
          tablaFincas.deleteRow(1);
    }
    // Se recorre la lista de colaboradores que devuelve la base de datos, para ingresarlas a la tabla

    for (var i=0; i<data.length; i++) {
    
        var row = tablaFincas.insertRow(i+1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = data[i].NUMERO;
        cell1.className = "text-center";
        
        cell2.innerHTML = data[i].NOMBRE;
        cell2.className = "text-center";

        cell3.innerHTML = data[i].TAMANO;
        cell3.className = "text-center";

        cell4.innerHTML = data[i].UBICACION;
        cell4.className = "text-center";

        cell5.innerHTML = data[i].IDENTIFICACION +' - '+ data[i].PROPIETARIO;
        cell5.className = "text-center";
        
        cell6.innerHTML = "<td><button type='button' class='btn btn-inverse-danger btn-icon' onclick=seleccionarFinca("+data[i].NUMERO+");><i class='mdi mdi-image-multiple'></i></button></td>";
        cell6.className = "text-center";

    };
};

// DECLARAMOS FUNCION PARA COMPLETAR FILTRAR FINCAS SEGÚN EL BUSCADOR 

inputFincasBuscar.addEventListener('keyup', function(){
    
    const configDB = dbConfig();

    const xhr = new XMLHttpRequest();
    const body = JSON.stringify({"datoIngresado": inputFincasBuscar.value} );
    xhr.open('POST', configDB + 'getFincaFiltro');
    xhr.responseType = 'json';
    xhr.send(body);

    xhr.onload = function() {
        let response = xhr.response;
        setFincasTabla(response); 
    };

});

// DECLARAMOS FUNCION PARA SELECCIONAR LA FINCA A ACTUALIZAR
function seleccionarFinca(numeroFinca){

    //ESCONDEMOS LA TABLA DE COLABORADORES Y MOSTRAMOS EL PANEL DE ACTUALIZAR
    seccionTablaActualizarFinca.style.display = "none";
    seccionActualizarFinca.style.display = "block"

    const configDB = dbConfig();

    const xhr = new XMLHttpRequest();
    const body = JSON.stringify({"datoIngresado": numeroFinca} );
    xhr.open('POST', configDB + 'getOneFinca');
    xhr.responseType = 'json';
    xhr.send(body);

    xhr.onload = function() {
        let response = xhr.response;
        etiquetaNumeroFincaAct.innerHTML = response[0].NUMERO; 
        inputNombreActualizar.value = response[0].NOMBRE;
        inputTamanoActualizar.value = response[0].TAMANO;
        inputUbicacionActualizar.value = response[0].UBICACION;
        
        cargarPropietariosSelector(response[0].IDENTIFICACION);
    };
};

botonAtras.addEventListener('click', function(){
    
    //MOSTRAMOS LA TABLA DE COLABORADORES Y ESCONDEMOS EL PANEL DE ACTUALIZAR
    seccionTablaActualizarFinca.style.display = "block";
    seccionActualizarFinca.style.display = "none"

});

// DECLARAMOS LA FUNCIÓN PARA COMPLETAR EL SELECTOR DE PROPIETARIOS
function cargarPropietariosSelector(identificacionPropietario){

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

            // VERIFICAMOS SI EL ID DEL PROPIETARIO ES EL MISMO AL ACTUAL
            // PARA COLOCARLO COMO SELECCIONADO EN LA LISTA DE SELECCIÓN
            if (identificacionPropietario == response[i].IDENTIFICACION){
                option.selected = "selected";
            }

            selectorPropietariosActualizar.add(option);
        
        };
    };

};

// DECLARAMOS LA FUNCIÓN QUE EJECUTA LA ACCIÓN DE ACTUALIZAR LOS DATOS DE UNA FINCA
botonActualizar.addEventListener('click', function(){
       
    const configDB = dbConfig();

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", configDB + "finca");
    const body = JSON.stringify({"numeroFinca": etiquetaNumeroFincaAct.innerHTML,"nombreCompleto": inputNombreActualizar.value, "tamano": inputTamanoActualizar.value, "ubicacion": inputUbicacionActualizar.value, "numeroPropietario": selectorPropietariosActualizar.value} );

    xhr.onload = () => {
    
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(JSON.parse(xhr.responseText));
            init();// Se recarga la data actualizada, para ser mostrada
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };

    xhr.send(body);
});
