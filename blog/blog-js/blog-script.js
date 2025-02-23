/* ********************************************************************************
 * BOTÓN "REGRESAR AL INICIO"
 ******************************************************************************** */
document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopBtn = document.createElement("button");
    scrollToTopBtn.id = "scrollToTopBtn";
    scrollToTopBtn.classList.add("scroll-to-top");
    scrollToTopBtn.innerHTML = "↑";
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

/* ********************************************************************************
 * MANEJO DEL MENÚ MÓVIL
 ******************************************************************************** */
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".menu-container.mobile-menu .menu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", function () {
            mobileMenu.classList.toggle("active");
        });

        const menuLinks = mobileMenu.querySelectorAll("a");
        menuLinks.forEach((link) => {
            link.addEventListener("click", function () {
                mobileMenu.classList.remove("active");
            });
        });
    }
});

/* ********************************************************************************
 * CONTROL DEL MENÚ MÓVIL ADICIONAL
 ******************************************************************************** */
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
 * REDUCCIÓN DEL LOGO AL HACER SCROLL
 ******************************************************************************** */
window.addEventListener("scroll", function () {
    const logo = document.querySelector("#logo");
    if (logo) {
        if (window.scrollY > 50) {
            logo.src = "/images/alaya-logo-scroll.webp";
        } else {
            logo.src = "/images/alaya-logo-ayurveda-tradicional-1.webp";
        }
    }
});
