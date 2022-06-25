let serverLink = "http://localhost:8080/api/";
let apiLink    = "http://localhost:3000/";

$(document).ready(function() {

    /// Cuando se carga la página enlistamos de una vez la lista de los clientes
    $.ajax({
        type: "GET",
        url: serverLink + "colaboradores/total",
        dataType: "json",
        
        success: function (result, status, xhr) {
              
            for (colaborador of result) {
                
                console.log(colaborador.nombre);
              
            }
            
        },
        
        error: function (xhr, status, error) {
            alert("Error - Las credenciales de ingreso no son correctas!!")
        }
    });

});