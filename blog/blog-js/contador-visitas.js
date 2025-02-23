document.addEventListener("DOMContentLoaded", function () {
    let postSlug = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo

    // Eliminar ".html" solo si existe
    postSlug = postSlug.replace(/\.html$/, '');

    fetch(`/blog/api/contador.php?post=${postSlug}`) // Consulta al PHP con el nombre correcto del post
        .then(response => response.json()) // Recibimos JSON con visitas, likes y fecha
        .then(data => {
            document.getElementById('contador').innerText = data.visitas || "0";
            document.getElementById('fecha_creacion').innerText = data.fecha_creacion || "Desconocida";
            document.getElementById('like-count').innerText = data.likes || "0";
        })
        .catch(error => {
            console.error("Error al cargar el contador: ", error);
            document.getElementById('contador').innerText = "Error";
            document.getElementById('fecha_creacion').innerText = "Desconocida";
            document.getElementById('like-count').innerText = "Error";
        });

    // Verifica si el botón de "Me gusta" existe antes de agregar evento
    const likeButton = document.getElementById('like-heart');
    if (likeButton) {
        likeButton.addEventListener("click", function () {
            fetch(`/blog/api/contador.php?post=${postSlug}&like=1`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('like-count').innerText = data.likes || "0";
                })
                .catch(error => console.error("Error al actualizar los likes: ", error));
        });
    }
});
