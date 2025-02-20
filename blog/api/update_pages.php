
<?php
// Ruta de la carpeta donde se encuentran las entradas (archivos HTML de cada entrada)
$blogDir = __DIR__ . "/../";  // Asume que las entradas están en public_html/blog/
// Ruta al archivo entries.json
$entriesJsonPath = __DIR__ . '/entries.json';
$entriesPerPage = 6;

// Buscar todos los archivos HTML en la carpeta que no sean los de paginación ni el blog principal
// (Se asume que las entradas tienen nombres distintos a "blog.html" y "page*.html")
$files = glob($blogDir . "*.html");
$entries = [];

foreach ($files as $file) {
    $filename = basename($file);
    // Ignorar archivos de paginación o el principal
    if (stripos($filename, 'blog.html') !== false || stripos($filename, 'page') === 0) {
        continue;
    }
    
    $url = "/blog/" . $filename;  // URL relativa de la entrada
    // Obtener la fecha de creación (más estable que modification)
    $creationTime = filectime($file);

    // Leer el contenido del archivo HTML de la entrada
    $htmlContent = file_get_contents($file);

    // Extraer el primer <h1> para el título
    preg_match('/<h1[^>]*>(.*?)<\/h1>/si', $htmlContent, $titleMatch);
    $title = isset($titleMatch[1]) ? trim($titleMatch[1]) : "Sin título";

    // Extraer la primera imagen <img>
    preg_match('/<img[^>]+src=["\'](.*?)["\']/si', $htmlContent, $imageMatch);
    $image = isset($imageMatch[1]) ? trim($imageMatch[1]) : "/images/default.jpg";

    // Extraer el primer párrafo <p> para el extracto
    preg_match('/<p[^>]*>(.*?)<\/p>/si', $htmlContent, $excerptMatch);
    $excerpt = isset($excerptMatch[1]) ? strip_tags($excerptMatch[1]) : "Sin descripción";

    // Agregar la entrada al array, incluyendo la fecha de creación para ordenar
    $entries[] = [
        "image"      => $image,
        "title"      => $title,
        "link"       => $url,
        "excerpt"    => $excerpt,
        "created_at" => $creationTime
    ];
}

// Ordenar las entradas de más reciente a más antigua
usort($entries, function ($a, $b) {
    return $b['created_at'] - $a['created_at'];
});

// Eliminar el campo created_at antes de guardar en JSON
foreach ($entries as &$entry) {
    unset($entry['created_at']);
}

// Guardar la lista de entradas en entries.json
file_put_contents($entriesJsonPath, json_encode($entries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Calcular el total de páginas necesarias
$totalPages = ceil(count($entries) / $entriesPerPage);

// Generar o actualizar las páginas de archivo: page1.html, page2.html, etc.
for ($i = 1; $i <= $totalPages; $i++) {
    $pageName = __DIR__ . "/../page{$i}.html";  // Se crean en la carpeta del blog
    $pageEntries = array_slice($entries, ($i - 1) * $entriesPerPage, $entriesPerPage);

    // Plantilla base para cada página generada automáticamente
    $content = '<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog-de Ayurveda-Tradicional - Página ' . $i . '</title>
  <link rel="stylesheet" href="/css/styles.css">
  <link rel="stylesheet" href="/css/blog.css">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@300;400;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Lora:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body>
<main>
  <div class="cabecera-paginas">
    <img id="cabecera-img" src="images/blog-de-ayurveda-tradicional.webp" alt="blog-de-ayurveda-tradicional">
    <h1>Blog de Ayurveda Tradicional - Página ' . $i . '</h1>
  </div>

  <div class="distribucion-blog">
                <!-- Contenedor para agrupar los dos bloques de contenido -->
                <div class="contenido-blog-container">
                  <!-- Bloque de contenido blog 1 -->
                  
                <div class="content-container">';
    
    foreach ($pageEntries as $entry) {
        $content .= '<div class="content-box">
      <img src="' . $entry['image'] . '" alt="' . $entry['title'] . '">
      <h2>' . $entry['title'] . '</h2>
      <p>' . $entry['excerpt'] . '</p>
      <a href="' . $entry['link'] . '" class="entry-button">Leer más</a>
    </div>';
    }

    $content .= '
  </div>
                    <div class="content-container">
                      <div id="pagination-container" class="pagination-container"><div>                      
                      
</div>
  </div>
</main>
<!-- Pie de página -->
<footer>
  <p>© 2025 Mi Sitio Web. Todos los derechos reservados.</p>
</footer>

<button id="scrollToTopBtn" class="scroll-to-top" onclick="scrollToTop()">
↑
</button>

<script src="/js/scripts.js"></script>

</body>
</html>';

    file_put_contents($pageName, $content);
}

echo json_encode(["status" => "success", "message" => "Entradas detectadas y páginas actualizadas."]);
?>


