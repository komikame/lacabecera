document.addEventListener("DOMContentLoaded", function () {
    let postSlug = window.location.pathname.split('/').pop(); // Obtiene el último segmento de la URL

    // Eliminar ".html" solo si existe
    postSlug = postSlug.replace(/\.html$/, '');

    fetch('/php/contador.php?post=' + postSlug) // Consulta al PHP con el nombre correcto del post
        .then(response => response.json()) // Recibimos JSON con visitas, likes y fecha
        .then(data => {
            document.getElementById('contador').innerText = data.visitas;
            document.getElementById('fecha_creacion').innerText = data.fecha_creacion;
            document.getElementById('like-count').innerText = data.likes;
        })
        .catch(error => {
            console.error("Error al cargar el contador: ", error);
            document.getElementById('contador').innerText = "Error";
            document.getElementById('fecha_creacion').innerText = "Desconocida";
            document.getElementById('like-count').innerText = "Error";
        });

    // Evento para el icono de corazón ❤️
    document.getElementById('like-heart').addEventListener("click", function () {
        fetch('/php/contador.php?post=' + postSlug + '&like=1')
            .then(response => response.json())
            .then(data => {
                document.getElementById('like-count').innerText = data.likes;
            })
            .catch(error => console.error("Error al actualizar los likes: ", error));
    });
});
