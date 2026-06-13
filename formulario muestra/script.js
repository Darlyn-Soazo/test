// script.js
document.getElementById("miFormulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar envío automático

    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var mensaje = document.getElementById("mensaje").value;

    // Enviar datos al servidor usando fetch
    fetch('http://localhost:3000/enviar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            email: email,
            mensaje: mensaje
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Formulario enviado correctamente.');
            // Aquí puedes limpiar el formulario si quieres
            document.getElementById("miFormulario").reset();
        } else {
            alert('Hubo un error al enviar el formulario.');
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
    });
});
