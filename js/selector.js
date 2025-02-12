const entriesPerPage = 6;

// Extrae el número de página de la URL usando el formato "pageX.html"
function getCurrentPageFromUrl() {
  const match = window.location.href.match(/page(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

// Renderiza la paginación en el div con id "pagination-container"
function renderPagination(totalPages) {
  const blockSize = 5; // Número de botones visibles por bloque
  const currentPage = getCurrentPageFromUrl();
  const blockIndex = Math.ceil(currentPage / blockSize);
  const startPage = (blockIndex - 1) * blockSize + 1;
  const endPage = Math.min(totalPages, blockIndex * blockSize);

  const container = document.getElementById("pagination-container");
  container.innerHTML = '';

  const nav = document.createElement('nav');
  nav.className = 'pagination';

  // Botón "Anterior": enlaza a la última página del bloque anterior
  if (blockIndex > 1) {
    const prevLink = document.createElement('a');
    prevLink.className = 'page-link';
    prevLink.innerHTML = "&laquo;";
    prevLink.href = `page${startPage - 1}.html`;
    nav.appendChild(prevLink);
  }

  // Botones de página para el bloque actual
  for (let i = startPage; i <= endPage; i++) {
    const link = document.createElement('a');
    link.className = 'page-link' + (i === currentPage ? ' active' : '');
    link.textContent = i;
    link.href = `page${i}.html`;
    nav.appendChild(link);
  }

  // Botón "Siguiente": enlaza a la primera página del siguiente bloque
  if (endPage < totalPages) {
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link';
    nextLink.innerHTML = "&raquo;";
    nextLink.href = `page${endPage + 1}.html`;
    nav.appendChild(nextLink);
  }

  container.appendChild(nav);
}

// Obtener el total de páginas consultando entries.json
fetch("/blog/api/entries.json")
  .then(response => response.json())
  .then(data => {
    const totalPages = Math.ceil(data.length / entriesPerPage);
    renderPagination(totalPages);
  })
  .catch(error => console.error("Error al cargar la paginación:", error));

