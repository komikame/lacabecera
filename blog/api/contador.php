<?php
$archivo = __DIR__ . '/contadores.json'; // Ubicación correcta dentro de /blog/api/

// Si el archivo no existe, lo crea con un JSON vacío
if (!file_exists($archivo)) {
    file_put_contents($archivo, '{}');
}

// Verifica que se haya pasado el parámetro "post" en la URL
if (!isset($_GET['post'])) {
    die(json_encode(["error" => "No se ha especificado un post."]));
}

// Sanitiza el slug eliminando caracteres no deseados
$slug = preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['post']);

// Lee el contenido del archivo JSON
$datos = json_decode(file_get_contents($archivo), true);

// Si el post no existe, lo inicializa con valores predeterminados
if (!isset($datos[$slug])) {
    $datos[$slug] = [
        "visitas" => 0,
        "likes" => 0,
        "fecha_creacion" => date("d/m/Y") // Guarda la fecha en formato DD/MM/YYYY
    ];
}

// Si se recibe una solicitud para sumar un "like"
if (isset($_GET['like']) && $_GET['like'] == "1") {
    $datos[$slug]["likes"]++;
    file_put_contents($archivo, json_encode($datos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(["likes" => $datos[$slug]["likes"]]);
    exit;
}

// Incrementa el contador de visitas
$datos[$slug]["visitas"]++;

// Guarda los cambios en el archivo JSON
file_put_contents($archivo, json_encode($datos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Devuelve el número de visitas, likes y la fecha de creación como JSON
echo json_encode($datos[$slug]);
?>
