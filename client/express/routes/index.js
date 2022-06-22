
let serverLink = "http://localhost:8080/api/";
let apiLink    = "http://localhost:3000/";

// Declaramos los elementos del DOM

var emailUsuario = document.getElementById( "emailLogin" );
var passUsuario  = document.getElementById( "passLogin" );

//// Método para ejecutar la función de logeo

$(document).ready(function() {
    $("#loginButton").click(function() {
        
        $.ajax({
            type: "GET",
            url: serverLink + "usuarios/validate?email=" + emailUsuario.value + "&pass="+passUsuario.value,
            dataType: "json",
            
            success: function (result, status, xhr) {
               

                // Declaramos el objeto que contendra los datos del usuario que ingresa
                const usuario = {
                    nombre_usuario: result["nombre_usuario"].split(" ")[0] + " " + result["apellidos_usuario"],
                    rol_usuario: result["rol_usuario"],
                    email_usuario: result["email"]
                }


                window.localStorage.setItem("usuarios",JSON.stringify(usuario)); // Se almacena los datos del usuario en localstorage 
                
                location.href = apiLink + 'addcolaborador'; // redirigimos al sitio
                
            },
            
            error: function (xhr, status, error) {
                alert("Error - Las credenciales de ingreso no son correctas!!")
            }
        });
    });
});