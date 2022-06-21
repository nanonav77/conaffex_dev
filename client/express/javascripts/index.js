
// Declaramos los elementos del DOM

var emailUsuario = document.getElementById( "emailLogin" );
var passUsuario  = document.getElementById( "passLogin" );

//// Función para ejecutar la función de logeo

$(document).ready(function() {
    $("#loginButton").click(function() {
        
        alert(emailUsuario.value);
        alert(passUsuario.value);
    });
});