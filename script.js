document.addEventListener("DOMContentLoaded", () => {

  // --- CONTROL DEL FORMULARIO DE CONTACTO Y CAMBIO DE BOTÓN ---
  const contactForm = document.getElementById('contact-form');
  const btnSubmit = document.getElementById('btn-submit');
  const btnText = document.getElementById('btn-text');
  const formStatus = document.getElementById('form-status');

  if (contactForm && btnSubmit && btnText) {
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');

    const checkFormValidity = () => {
      let allFilled = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          allFilled = false;
        }
      });

      if (allFilled) {
        btnSubmit.removeAttribute('disabled');
        btnSubmit.style.opacity = '1';
        btnSubmit.style.cursor = 'pointer';
        btnText.textContent = 'Enviar mensaje';
      } else {
        btnSubmit.setAttribute('disabled', 'true');
        btnSubmit.style.opacity = '0.6';
        btnSubmit.style.cursor = 'not-allowed';
        btnText.textContent = 'Completa los campos';
      }
    };

    // Escuchar cambios en los campos de texto
    inputs.forEach(input => {
      input.addEventListener('input', checkFormValidity);
    });

    // Inicializar estado del botón al cargar
    checkFormValidity();

    // Envío del formulario mediante Fetch API con manejo de errores
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      btnSubmit.setAttribute('disabled', 'true');
      btnText.textContent = 'Enviando...';
      formStatus.textContent = '';

      try {
        const data = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.style.color = '#22c55e';
          formStatus.textContent = '¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.';
          contactForm.reset();
          checkFormValidity();
        } else {
          throw new Error('Error al enviar la información');
        }
      } catch (error) {
        formStatus.style.color = '#ef4444';
        formStatus.textContent = 'Hubo un error al enviar el mensaje. Intenta nuevamente.';
        btnSubmit.removeAttribute('disabled');
        btnText.textContent = 'Enviar mensaje';
      }
    });
  }

  // --- ANIMACIÓN DE LAS BARRAS DE HABILIDADES ---
  const skillBars = document.querySelectorAll(".skill-bar");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => {
    observer.observe(bar);
  });

  // --- ACORDEÓN DE PROYECTOS (DESPLEGABLE SUAVE) ---
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector("i.fa-chevron-down") || header.querySelector("i");

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        if (icon) icon.style.transform = "rotate(0deg)";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        if (icon) {
          icon.style.transform = "rotate(180deg)";
          icon.style.transition = "transform 0.3s ease";
        }
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

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

});