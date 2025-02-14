document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.querySelector("main");

    /* ********************************************************************************
    * Función para manejar submenús internos (menu .sections)
    ******************************************************************************** */
    function assignInternalNavigation(container) {
        const internalLinks = container.querySelectorAll(".sections a[data-target]");
        const sections = container.querySelectorAll("div[id^='section']");

        if (internalLinks.length === 0 || sections.length === 0) {
            console.warn("No se encontraron enlaces de navegación interna en esta página.");
            return;
        }

        console.log("Submenú interno detectado, configurando navegación interna.");

        sections.forEach((section) => {
            section.classList.add("hidden");
            section.classList.remove("visible");
        });

        const firstSection = container.querySelector("#section1");
        if (firstSection) {
            firstSection.classList.remove("hidden");
            firstSection.classList.add("visible");
        }

        internalLinks.forEach(link => {
            const targetId = link.dataset.target;
            const targetSection = container.querySelector(`#${targetId}`);
            if (targetSection) {
                targetSection.id = targetId;
            }
        });

        internalLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const targetId = link.getAttribute("data-target");
                const targetSection = container.querySelector(`#${targetId}`);

                if (targetSection) {
                    console.log(`Mostrando sección interna: ${targetId}`);

                    sections.forEach((section) => {
                        section.classList.add("hidden");
                        section.classList.remove("visible");
                    });

                    targetSection.classList.remove("hidden");
                    targetSection.classList.add("visible");

                    internalLinks.forEach((l) => l.classList.remove("active"));
                    link.classList.add("active");

                    targetSection.scrollIntoView({ behavior: "smooth" });
                } else {
                    console.warn(`No se encontró la sección interna: ${targetId}`);
                }
            });
        });

        if (internalLinks.length > 0) {
            internalLinks[0].classList.add("active");
        }
    }

    const container = document.querySelector(".content");
    if (container) {
        assignInternalNavigation(container);
    }

    console.log("JavaScript cargado correctamente.");
});

/* ********************************************************************************
 * Manejo del menú móvil
 ******************************************************************************** */
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".menu-container.mobile-menu .menu");

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });

    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    });
}

/* ********************************************************************************
 * Efecto Parallax
 ******************************************************************************** */
document.addEventListener("scroll", () => {
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
        const speed = 0.5;
        const offset = window.scrollY * speed;
        element.style.backgroundPositionY = `${offset}px`;
    });
});

/* ********************************************************************************
 * Manejo del carrusel
 ******************************************************************************** */
function initCarousel() {
    let currentIndex = 0;
    let interval;

    function moveCarousel(direction) {
        const items = document.querySelectorAll(".carousel-item");
        const totalItems = items.length;

        items[currentIndex].classList.remove("active");

        currentIndex = (currentIndex + direction + totalItems) % totalItems;

        items[currentIndex].classList.add("active");

        const inner = document.querySelector(".carousel-inner");
        inner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function startAutoSlide() {
        interval = setInterval(() => {
            moveCarousel(1);
        }, 5000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    const carousel = document.querySelector(".carousel");
    if (carousel) {
        carousel.addEventListener("mouseenter", stopAutoSlide);
        carousel.addEventListener("mouseleave", startAutoSlide);
    }

    startAutoSlide();
}

initCarousel();

/* ********************************************************************************
 * Reducir el logo al hacer scroll
 ******************************************************************************** */
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        logo.src = "/images/alaya-logo-scroll.webp";
    } else {
        logo.src = "/images/alaya-logo-ayurveda-tradicional-1.webp";
    }
});

console.log("JavaScript cargado correctamente.");

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector("#mobileMenu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", function () {
            mobileMenu.classList.toggle("show");
            menuToggle.classList.toggle("active");
        });

        document.addEventListener("click", function (event) {
            if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                mobileMenu.classList.remove("show");
                menuToggle.classList.remove("active");
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                mobileMenu.classList.remove("show");
                menuToggle.classList.remove("active");
            }
        });
    }
});

/* ********************************************************************************
 * BOTÓN "REGRESAR AL INICIO"
 ******************************************************************************** */
document.addEventListener("DOMContentLoaded", function () {
    // Crear el botón flotante
    const scrollToTopBtn = document.createElement("button");
    scrollToTopBtn.id = "scrollToTopBtn";
    scrollToTopBtn.classList.add("scroll-to-top");
    scrollToTopBtn.innerHTML = "↑";
    document.body.appendChild(scrollToTopBtn);

    // Función para mostrar/ocultar el botón en función del scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    // Función para regresar al inicio de la página
    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
