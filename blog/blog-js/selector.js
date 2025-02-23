const entriesPerPage = 6;

// Extrae el número de página de la URL usando el formato "pageX.html"
function getCurrentPageFromUrl() {
  const match = window.location.href.match(/page(\d+)/);
  return match ? parseInt(match[1], 10) : 0; // 0 significa que estamos en blog.html
}

// Renderiza la paginación en el div con id "pagination-container"
function renderPagination(totalPages) {
  const currentPage = getCurrentPageFromUrl();
  const container = document.getElementById("pagination-container");
  if (!container) return; // Si el contenedor no existe, no hacer nada

  container.innerHTML = '';
  const nav = document.createElement('nav');
  nav.className = 'pagination';

  // Botón "<<" que siempre lleva a blog.html (solo si no estamos en blog.html)
  if (currentPage > 0) {
    const firstPageLink = document.createElement('a');
    firstPageLink.className = 'page-link';
    firstPageLink.innerHTML = "&laquo;&laquo;";
    firstPageLink.href = "/blog/blog.html";
    nav.appendChild(firstPageLink);
  }

  // Botón "<" para ir a la página anterior (solo si no estamos en blog.html)
  if (currentPage > 0) {
    const prevPage = currentPage === 1 ? "blog.html" : `page${currentPage - 1}.html`;
    const prevLink = document.createElement('a');
    prevLink.className = 'page-link';
    prevLink.innerHTML = "&laquo;";
    prevLink.href = `/blog/${prevPage}`;
    nav.appendChild(prevLink);
  }

  // Botones numéricos de paginación (máximo 5 botones)
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  // Ajustar la visibilidad del botón 0 (solo aparece en páginas menores a la página 5)
  if (currentPage < 5) {
    const blogButton = document.createElement('a');
    blogButton.className = 'page-link';
    blogButton.innerHTML = "0";
    blogButton.href = "/blog/blog.html";
    nav.appendChild(blogButton);
  }

  for (let i = startPage; i <= endPage; i++) {
    if (i === currentPage) {
      // Ocultamos el botón de la página actual
      continue;
    }

    const link = document.createElement('a');
    link.className = 'page-link';
    link.textContent = i;
    link.href = `/blog/page${i}.html`;
    nav.appendChild(link);
  }

  // Botón ">" para ir a la siguiente página (si no estamos en la última)
  if (currentPage < totalPages) {
    const nextPage = `page${currentPage + 1}.html`;
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link';
    nextLink.innerHTML = "&raquo;";
    nextLink.href = `/blog/${nextPage}`;
    nav.appendChild(nextLink);
  }

  // Botón ">>" para ir a la última página
  if (currentPage < totalPages - 1) {
    const lastPageLink = document.createElement('a');
    lastPageLink.className = 'page-link';
    lastPageLink.innerHTML = "&raquo;&raquo;";
    lastPageLink.href = `/blog/page${totalPages}.html`;
    nav.appendChild(lastPageLink);
  }

  container.appendChild(nav);
}

// Obtener el total de páginas desde entries.json
fetch("/blog/api/entries.json")
  .then(response => response.json())
  .then(entries => {
    const totalPages = Math.ceil(entries.length / entriesPerPage);
    if (entries.length > entriesPerPage) {
      renderPagination(totalPages);
    }
  })
  .catch(error => console.error("Error al cargar la paginación:", error));
