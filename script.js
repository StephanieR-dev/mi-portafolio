document.addEventListener("DOMContentLoaded", () => {
    
    // --- ANIMACIÓN DE LAS BARRAS DE HABILIDADES (EFECTO DEL VIDEO) ---
    const barras = document.querySelectorAll(".barra-progreso");

    const animarBarras = () => {
        barras.forEach(barra => {
            const porcentaje = barra.getAttribute("data-porcentaje");
            barra.style.width = porcentaje;
        });
    };

    // Usar IntersectionObserver para activar la animación solo al llegar con scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarBarras();
            }
        });
    }, { threshold: 0.2 });

    const seccionHabilidades = document.getElementById("habilidades");
    if (seccionHabilidades) {
        observer.observe(seccionHabilidades);
    } else {
        // Ejecución fallback en caso de no soportar observer
        setTimeout(animarBarras, 300);
    }


    // --- ACORDEÓN DE PROYECTOS (DESPLEGABLE) ---
    const acordeonHeaders = document.querySelectorAll(".acordeon-header");

    acordeonHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const contenido = header.nextElementSibling;
            const icono = header.querySelector(".fa-chevron-down");

            if (contenido.style.display === "block") {
                contenido.style.display = "none";
                if(icono) icono.style.transform = "rotate(0deg)";
            } else {
                contenido.style.display = "block";
                if(icono) icono.style.transform = "rotate(180deg)";
            }
        });
    });

});