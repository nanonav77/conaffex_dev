

const btnInsert      = document.getElementById("button_colaborador_insert");
const btnErrorInsert = document.getElementById('error_campos_vacios_insert_col');

const numeroColaborador   = document.getElementById("numero_colaborador_insert");
const nombreColaborador   = document.getElementById("nombre_colaborador_insert");
const telefonoColaborador = document.getElementById("telefono_colaborador_insert");
const identificacionColaborador = document.getElementById("identificacion_colaborador_insert");
const tarjetaColaborador  = document.getElementById("tarjeta_colaborador_insert");
const tipoColaborador     = document.getElementById("select_tipo_colaborador_insert");


btnInsert.onclick = () => {
    
    if (identificacionColaborador.value === "" && nombreColaborador.value === "" && numeroColaborador.value === "" && tarjetaColaborador.value === "" && telefonoColaborador.value === ""){

        btnErrorInsert.click;

    }   

};

