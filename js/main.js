// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Función para cerrar el menú móvil
function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
}

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Solo prevenir default si es un ancla válida (no vacía)
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Cerrar menú móvil si está abierto
                closeMobileMenu();
                
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar la página
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        }
    });
});

// Cerrar menú al hacer clic en cualquier link del menú o logo
document.querySelectorAll('.nav-link, .footer-links a[href^="#"], .logo-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Cerrar menú al hacer clic fuera del menú (en móvil)
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    }
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});


// Animación de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.service-card, .project-card, .stat, .cert-card, .value-card, .alliance-card, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Animación de números en estadísticas
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observer para estadísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.getAttribute('data-target'));
            if (target && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateNumber(statNumber, target);
            }
        }
    });
}, { threshold: 0.5 });

// Observar todos los stat-items
document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// Actualizar URL del botón de login según el entorno
document.addEventListener('DOMContentLoaded', function() {
    // En producción, cambiar esto por la URL real de la app
    const appUrl = 'http://127.0.0.1:8001/login'; // Cambiar en producción
    
    document.querySelectorAll('a[href*="login"]').forEach(link => {
        // Mantener la URL configurada o actualizarla según necesidad
        console.log('Botón de login configurado:', link.href);
    });
});

