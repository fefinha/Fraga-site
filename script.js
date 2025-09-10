// (function() {
//   const originalAddEventListener = EventTarget.prototype.addEventListener;
//   EventTarget.prototype.addEventListener = function(type, listener, options) {

//     if (['touchstart', 'touchmove', 'wheel', 'scroll'].includes(type)) {
//       if (typeof options === 'boolean' || options === undefined) {
//         options = { passive: true };
//       } else if (typeof options === 'object') {
//         options.passive = options.passive !== undefined ? options.passive : true;
//       }
//     }
//     return originalAddEventListener.call(this, type, listener, options);
//   };
// })();

// Mobile Navigation
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu?.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu?.classList.remove('show-menu');
    });
}

// Remove menu mobile when clicking nav links
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    if (link) {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('show-menu');
        });
    }
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}, { passive: true });

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('#contato'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll reveal animation
const scrollReveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
};

// Add reveal class to elements
const addRevealClass = () => {
    const elementsToReveal = [
        '.service-card',
        '.project-card',
        '.contact-cta__content'
    ];
    
    elementsToReveal.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('reveal');
        });
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    addRevealClass();
    scrollReveal();
});

window.addEventListener('scroll', () => {
    requestAnimationFrame(scrollReveal);
}, { passive: true });

// Loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
});

// Form validation
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
};

// Email validation
const validateEmail = (email) => {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return re.test(email);
};

// Phone validation (Brazilian format)
const validatePhone = (phone) => {
    const re = /^\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}$/;
    return re.test(phone);
};

// Format phone number
const formatPhone = (input) => {
    let value = input.value.replace(/\\D/g, '');
    
    if (value.length >= 10) {
        if (value.length === 10) {
            value = value.replace(/(\\d{2})(\\d{4})(\\d{4})/, '($1) $2-$3');
        } else {
            value = value.replace(/(\\d{2})(\\d{5})(\\d{4})/, '($1) $2-$3');
        }
    } else if (value.length >= 6) {
        value = value.replace(/(\\d{2})(\\d{4})/, '($1) $2');
    } else if (value.length >= 2) {
        value = value.replace(/(\\d{2})/, '($1) ');
    }
    
    input.value = value;
};

// Add phone formatting to phone inputs
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', () => formatPhone(input));
});

// Intersection Observer for better performance
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
};

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.hero__stat-number, .stat__number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '%');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
};

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    addRevealClass();
    observeElements();
    animateCounters();
});

// Handle contact form submission
const handleContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm(contactForm)) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
};

// Preloader
const hidePreloader = () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
};

window.addEventListener('load', hidePreloader);

// Add WhatsApp button
const createWhatsAppButton = () => {
    const whatsappButton = document.createElement('a');
    whatsappButton.className = 'whatsapp-button';
    whatsappButton.href = 'https://wa.me/5548991389019?text=Olá,%20gostaria%20de%20fazer%20um%20orçamento';
    whatsappButton.target = '_blank';
    whatsappButton.rel = 'noopener noreferrer';
    whatsappButton.setAttribute('aria-label', 'Fale conosco pelo WhatsApp');
    whatsappButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
    `;
    document.body.appendChild(whatsappButton);
};

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    handleContactForm();
    createWhatsAppButton(); // Replace createBackToTop with createWhatsAppButton
});

// Performance optimization
const optimizePerformance = () => {
    let scrollTimeout;
    const handleScroll = () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                scrollReveal();
                scrollTimeout = null;
            }, 10);
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
};

document.addEventListener('DOMContentLoaded', optimizePerformance);

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNiAxNkwyNCAyNE0yNCAxNkwxNiAyNCIgc3Ryb2tlPSIjOTBBNEFFIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
    });
});

// Dados completos dos projetos
const projectsData = {
    'pch-macacos': {
        title: 'PCH - Macacos',
        badge: 'PCH', 
        location: 'São José, SC',
        year: '2023',
        area: '8.500m²',
        images: [
            'images/PCH - Macacos/PCH-macacos-001.png',
            'images/PCH - Macacos/PCH-macacos-002.png',
            'images/PCH - Macacos/PCH-macacos-003.png',
            'images/PCH - Macacos/PCH-macacos-004.png',
            'images/PCH - Macacos/PCH-macacos-005.png',
            'images/PCH - Macacos/PCH-macacos-006.png',
            'images/PCH - Macacos/PCH-macacos-007.png'
        ]
    },
    'contencao-tubarao': {
        title: 'Contenção Tubarão',
        badge: 'Contenção', 
        location: 'Tubarão, SC',
        year: '2024',
        area: '15.000m²',
        images: [
            'images/Contencao-Tubarao/Contencao-tubarao-001.png',
            'images/Contencao-Tubarao/Contencao-tubarao-002.png',
            'images/Contencao-Tubarao/Contencao-tubarao-003.png',
            'images/Contencao-Tubarao/Contencao-tubarao-004.png',
            'images/Contencao-Tubarao/Contencao-tubarao-005.png'
        ]
    },
    'serra-geral': {
        title: 'Serra Geral',
        badge: 'Serra', 
        location: 'Urubici, SC',
        year: '2023',
        area: '25.000m²',
        images: [
            'images/Serra do Corvo/serra-corvo-branco-001.png',
            'images/Serra do Corvo/serra-corvo-branco-002.png',
            'images/Serra do Corvo/serra-corvo-branco-003.png',
            'images/Serra do Corvo/serra-corvo-branco-004.png',
            'images/Serra do Corvo/serra-corvo-branco-005.png',
            'images/Serra do Corvo/serra-corvo-branco-006.png',
            'images/Serra do Corvo/serra-corvo-branco-007.png',
            'images/Serra do Corvo/serra-corvo-branco-008.png'
        ]
    },
    'pch-guapore': {
        title: 'PCH - Guaporé',
        badge: 'PCH', 
        location: 'Guaporé, RS',
        year: '2022',
        area: '30.000m²',
        images: [
            'images/PCH - Guaporé/phc-guapore-001.png',
            'images/PCH - Guaporé/phc-guapore-002.png',
            'images/PCH - Guaporé/phc-guapore-003.png',
            'images/PCH - Guaporé/phc-guapore-004.png',
            'images/PCH - Guaporé/phc-guapore-005.png'
        ]
    },
    'pch-coracao': {
        title: 'PCH - Coração',
        badge: 'PCH', 
        location: 'Local, SC',
        year: '2022',
        area: '30.000m²',
        images: [
            'images/PCH - Coração/pch-coracao-001-1.png',
            'images/PCH - Coração/pch-coracao-001-2.png',
            'images/PCH - Coração/pch-coracao-001-3.png',
            'images/PCH - Coração/pch-coracao-001-4.png'
        ]
    },
    'pch-cascata': {
        title: 'PCH - Cascata',
        badge: 'PCH', 
        location: 'Local, SC',
        year: '2022',
        area: '30.000m²',
        images: [
            'images/PCH - Cascata/PCHs-cascata-001.png',
            'images/PCH - Cascata/PCHs-cascata-002.png',
            'images/PCH - Cascata/PCHs-cascata-003.png'
        ]
    },
    'pch-da-ilha': {
        title: 'PCH - Da Ilha',
        badge: 'PCH', 
        location: 'Local, SC',
        year: '2022',
        area: '30.000m²',
        images: [
            'images/PCH - Da Ilha/PCHs-ilha-001.png',
            'images/PCH - Da Ilha/PCHs-ilha-002.png',
            'images/PCH - Da Ilha/PCHs-ilha-003.png',
            'images/PCH - Da Ilha/PCHs-ilha-004.png'
        ]
    },
    'pch-galupo': {
        title: 'PCH - Galupo',
        badge: 'PCH', 
        location: 'Local, SC',
        year: '2022',
        area: '30.000m²',
        images: [
            'images/PCH - Galupo/pch-galupo-1.png',
            'images/PCH - Galupo/pch-galupo-2.png',
            'images/PCH - Galupo/pch-galupo-3.png'
        ]
    },
    'pch-linha-rica': {
        title: 'PCH - Linha Rica',
        badge: 'PCH',
        location: 'Local, SC',
        year: '2022',
        area: '30.000m²',
        images: [
            'images/PCH - Linha Rica/pch-linha-rica-001.png',
            'images/PCH - Linha Rica/pch-linha-rica-002.png',
            'images/PCH - Linha Rica/pch-linha-rica-003.png',
            'images/PCH - Linha Rica/pch-linha-rica-004.png',
            'images/PCH - Linha Rica/pch-linha-rica-005.png',
            'images/PCH - Linha Rica/pch-linha-rica-006.png'
        ]
    },
    'pch-morro-grande': {
        title: 'PCH - Morro Grande',
        badge: 'PCH', 
        location: 'Local, SC',
        year: '2022',
        area: '30.000m²',
        images: [
            'images/PCH - Morro Grande/pch-morro-grande-001.png',
            'images/PCH - Morro Grande/pch-morro-grande-002.png',
            'images/PCH - Morro Grande/pch-morro-grande-003.png',
            'images/PCH - Morro Grande/pch-morro-grande-004.png',
            'images/PCH - Morro Grande/pch-morro-grande-005.png',
            'images/PCH - Morro Grande/pch-morro-grande-006.png'
        ]
    },
    'pch-nova-fatima': {
        title: 'PCH - Nova Fátima',
        badge: 'PCH', 
        location: 'Local, SC',
        year: '2022',
        area: '30.000m²',
        images: [
            'images/PCH - Nova Fátima/PCH-Nova-Fatima-banner-001.jpg',
            'images/PCH - Nova Fátima/PCH-Nova-Fatima-banner-002.jpg',
            'images/PCH - Nova Fátima/PCH-Nova-Fatima-banner-003.jpg',
        ]
    },
    'pch-albano-machado': {
        title: 'PCH - Albano Machado',
        badge: 'PCH', 
        location: 'Local, SC',
        year: '2022',
        area: '30.000m²',
        images: [
            'images/PCH - Albano Machado/PCH-Albano-Machado-banner-001.jpg',
            'images/PCH - Albano Machado/PCH-Albano-Machado-banner-002.jpg',
            'images/PCH - Albano Machado/PCH-Albano-Machado-banner-003.jpg',
            'images/PCH - Albano Machado/PCH-Albano-Machado-banner-004.jpg'
        ]
    },
    'pch-rastro-de-auto': {
        title: 'PCH - Rastro de Auto',
        badge: 'PCH', 
        location: 'Local, SC',
        year: '2022',
        area: '30.000m²',
        images: [
            'images/PCH - Rastro de Auto/PCH-Rastro-de-Auto-banner-001.jpg',
            'images/PCH - Rastro de Auto/PCH-Rastro-de-Auto-banner-002.jpg',
            'images/PCH - Rastro de Auto/PCH-Rastro-de-Auto-banner-003.jpg',
        ]
    },
    'pch-abranjo': {
        title: 'PCH - Abranjo',
        badge: 'PCH', 
        location: 'Local, SC',
        year: '2022',
        area: '30.000m²',
        images: [
            'images/PCH - Abranjo/PCH-Abranjo-banner-001.jpg',
            'images/PCH - Abranjo/PCH-Abranjo-banner-002.jpg',
            'images/PCH - Abranjo/PCH-Abranjo-banner-003.jpg',
            'images/PCH - Abranjo/PCH-Abranjo-banner-004.jpg'
        ]
    }
    
};

// Project Modal
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const projectCards = document.querySelectorAll('.project-card');

    if (!modal || !modalClose || !projectCards.length) return;

    function openModal(project) {
        const modalTitle = document.getElementById('modal-title');
        const modalMainImage = document.getElementById('modal-main-image');
        const thumbnailsContainer = document.getElementById('modal-thumbnails');
        
        // Set title and info
        modalTitle.textContent = project.title;
        
        document.getElementById('modal-year').innerHTML = `
            <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke-width="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke-width="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/>
            </svg>
            ${project.year}
        `;
        
        document.getElementById('modal-area').innerHTML = `
            <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke-width="2"/>
                <polyline points="17 8 12 3 7 8" stroke-width="2"/>
                <line x1="12" y1="3" x2="12" y2="15" stroke-width="2"/>
            </svg>
            ${project.area}
        `;

        // Set main image
        modalMainImage.src = project.images[0];
        modalMainImage.alt = project.title;

        // Create thumbnails
        thumbnailsContainer.innerHTML = project.images
            .map((img, index) => `
                <div class="project-modal__thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <img src="${img}" alt="${project.title} - Imagem ${index + 1}">
                </div>
            `).join('');

        // Add thumbnail click events
        document.querySelectorAll('.project-modal__thumbnail').forEach(thumb => {
            thumb.addEventListener('click', () => {
                const index = thumb.getAttribute('data-index');
                modalMainImage.src = project.images[index];
                
                document.querySelector('.project-modal__thumbnail.active')?.classList.remove('active');
                thumb.classList.add('active');
            });
        });

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add click events
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            const project = projectsData[projectId];
            if (project) {
                openModal(project);
            }
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Add keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', initProjectModal);

// Portfolio Filter Function
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.querySelector('.project-card__badge')
                    .textContent
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
                
                if (filterValue === 'all' || category === filterValue.toLowerCase()) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize filter when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolioFilter);

// Lightbox Function
function initLightbox() {
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');

    window.openLightbox = function(imageSrc, caption) {
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = caption;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 50);
    }

    window.closeLightbox = function() {
        lightbox.style.opacity = '0';
        document.body.style.overflow = '';
        
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    }

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const statsSection = document.querySelector('.portfolio-stats');
    if (!statsSection) return;

    const statsItems = document.querySelectorAll('.stat-item');
    let hasStarted = false;

    function animateCounter(element, target, suffix) {
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);

        function update() {
            if (current < target) {
                current = Math.min(current + step, target);
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(update);
            } else {
                element.textContent = target + suffix;
            }
        }
        update();
    }

    function startCounting() {
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !hasStarted) {
            hasStarted = true;

            statsItems.forEach(item => {
                const numberElement = item.querySelector('.stat-item__number');
                const target = parseInt(numberElement.getAttribute('data-count'));
                const suffix = item.dataset.type === 'satisfaction' ? '%' : '+';
                animateCounter(numberElement, target, suffix);
            });

            window.removeEventListener('scroll', startCounting);
        }
    }

    window.addEventListener('scroll', startCounting, { passive: true });
    startCounting(); // Check initial position
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initStatsCounter();
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');
        
        question.addEventListener('click', () => {
            // Get the current height of the answer
            const isActive = item.classList.contains('active');
            
            // First close all other open answers
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq__answer');
                    otherAnswer.style.height = '0px';
                }
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                answer.style.height = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                answer.style.height = '0px';
            }
        });
    });
});

// Update modal touch events if present
if (typeof modal !== 'undefined' && modal) {
    modal.addEventListener('touchmove', (e) => {
        if (!e.target.closest('.project-modal__content')) {
            e.preventDefault();
        }
    }, { passive: false });
}


