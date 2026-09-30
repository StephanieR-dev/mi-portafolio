document.addEventListener("DOMContentLoaded", () => {

  // --- ANIMACIÓN DE LAS BARRAS DE HABILIDADES ---
  const skillBars = document.querySelectorAll(".skill-bar");

  // Usar IntersectionObserver para activar la animación al hacer scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Si la barra entra en la pantalla, le agregamos la clase 'active'
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.2 });

  // Observar cada barra individualmente
  skillBars.forEach(bar => {
    observer.observe(bar);
  });


  // --- ACORDEÓN DE PROYECTOS (DESPLEGABLE SUAVE) ---
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector(".fa-chevron-down");

      // Si ya tiene altura, lo cerramos
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        if (icon) icon.style.transform = "rotate(0deg)";
        icon.style.transition = "transform 0.3s ease";
      } else {
        // Si está cerrado, calculamos su altura real (scrollHeight) y lo abrimos
        content.style.maxHeight = content.scrollHeight + "px";
        if (icon) icon.style.transform = "rotate(180deg)";
        icon.style.transition = "transform 0.3s ease";
      }
    });
  });


  // --- MENÚ HAMBURGUESA PARA MÓVIL ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Cerrar menú automáticamente al hacer clic en un enlace (útil en celulares)
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

});