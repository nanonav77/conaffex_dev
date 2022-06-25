
let serverLink = "http://localhost:8080/api/";
let apiLink    = "http://localhost:3000/";


$(document).ready(function() {

    // Declaramos los elementos del DOM
    var nombreCompleto = document.getElementById( "nombreColaborador" );
    var identificacion = document.getElementById( "identificacionColaborador" );
    var telefono       = document.getElementById( "telefonoColaborador" );
    var cuenta         = document.getElementById( "cuentaColaborador" );
    var email          = document.getElementById( "emailColaborador" );
    var direccion      = document.getElementById( "dirColaborador" );

    $("#buttonRegistrar").click(function() { //// Método para realizar el registro de un colaborador        
        
        $.ajax({
            type: "POST",           
            url: serverLink + "colaboradores/crear",
            dataType: "json",
            contentType: 'application/json',
            processData: false,
            data: JSON.stringify( { "nombre": nombreCompleto.value, "identificacion": identificacion.value, "telefono": telefono.value,"email": email.value, "cuenta": cuenta.value, "estado": 'Activo'} ),

            success: function (data, status, xhr) {
                   
                alert('Éxito - El usuario ha sido creado con éxito')
                $("#buttonLimpiar").click();
            },
            
            error: function (xhr, status, error) {
                alert("Error - Al intentar crear el colaborador especificado!!")
            }
        });

    });

    $("#buttonLimpiar").click(function() { //// Método para realizar la limpieza de los campos de registro        
        
        nombreCompleto.value = " ";
        identificacion.value = " ";
        telefono.value = " ";
        cuenta.value = " ";
        email.value = " ";
        direccion.value = " ";   
        
    });

});