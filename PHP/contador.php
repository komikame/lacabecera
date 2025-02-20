<?php
$archivo = '../contadores.json'; // Ruta ajustada para estar en la raíz

// Si el archivo no existe, lo crea con un JSON vacío
if (!file_exists($archivo)) {
    file_put_contents($archivo, '{}');
}

// Obtener el nombre del post desde la URL
if (!isset($_GET['post'])) {
    die(json_encode(["error" => "No se ha especificado un post."]));
}
$slug = preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['post']); // Sanitiza el slug

// Leer el contenido del archivo JSON
$datos = json_decode(file_get_contents($archivo), true);

// Si el post no existe, lo crea con visitas en 0, likes en 0 y la fecha actual en formato DD/MM/YYYY
if (!isset($datos[$slug])) {
    $datos[$slug] = [
        "visitas" => 0,
        "likes" => 0,
        "fecha_creacion" => date("d/m/Y") // Guarda la fecha en DD/MM/YYYY
    ];
}

// Si se recibe una solicitud para sumar un "like"
if (isset($_GET['like']) && $_GET['like'] == "1") {
    $datos[$slug]["likes"]++;
    file_put_contents($archivo, json_encode($datos, JSON_PRETTY_PRINT));
    echo json_encode(["likes" => $datos[$slug]["likes"]]);
    exit;
}

// Incrementar el contador de visitas
$datos[$slug]["visitas"]++;

// Guardar los cambios en el archivo JSON
file_put_contents($archivo, json_encode($datos, JSON_PRETTY_PRINT));

// Devolver el número de visitas, likes y la fecha de creación como JSON
echo json_encode($datos[$slug]);
?>
