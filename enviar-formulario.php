<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $nombre = htmlspecialchars($_POST['nombre']);
    $apellidos = htmlspecialchars($_POST['apellidos']);
    $telefono = htmlspecialchars($_POST['telefono']);
    $email = htmlspecialchars($_POST['email']);
    $cursos = isset($_POST['curso']) ? $_POST['curso'] : [];
    $mensaje = htmlspecialchars($_POST['mensaje']);

    // Validar campos obligatorios
    if (empty($nombre) || empty($apellidos) || empty($telefono) || empty($email) || empty($mensaje)) {
        die("Por favor, completa todos los campos.");
    }

    // Validar que se haya seleccionado al menos un curso
    if (empty($cursos)) {
        die("Por favor, selecciona al menos un curso.");
    }

    // Crear el mensaje del correo
    $to = "recepcion@medicina-ayurveda.es"; // Cambia esto a tu correo
    $subject = "Nuevo formulario de contacto";
    $body = "Nombre: $nombre $apellidos\n";
    $body .= "Teléfono: $telefono\n";
    $body .= "Correo Electrónico: $email\n";
    $body .= "Cursos seleccionados:\n";
    foreach ($cursos as $curso) {
        $body .= "- $curso\n";
    }
    $body .= "\nMensaje:\n$mensaje\n";

    // Cabeceras del correo
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "¡Gracias! Tu mensaje ha sido enviado correctamente.";
    } else {
        echo "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.";
    }
} else {
    echo "Acceso no permitido.";
}
?>
