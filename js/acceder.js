document.querySelector('.buttons').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtén los valores de los campos del formulario
    var cuenta = document.getElementById('cuenta').value;
    var contraseña = document.getElementById('contraseña').value;

    // Realiza una solicitud a la API para verificar las credenciales
    fetch('http://localhost:8080/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cuenta: cuenta,
            contraseña: contraseña
        })
    })
    .then(function(response) {
        if (response.ok) {
            // Las credenciales son correctas, redireccionar a la página principal
            window.location.href = 'http://127.0.0.1:5500/craftsoline-fromfinal/principal.html';
        } else {
            // Las credenciales son incorrectas, mostrar mensaje de error
            alert('Usuario o contraseña incorrectos');
        }
    })
    .catch(function(error) {
        // Hubo un error en la solicitud a la API
        alert('Hubo un error en la solicitud a la API');
        console.error(error);
    });
});

