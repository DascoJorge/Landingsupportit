document.addEventListener('DOMContentLoaded', () => {
    console.log("Support IT Script Loaded - Elite Flow Active");
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Counters Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            if (counter.classList.contains('animated')) return;
            counter.classList.add('animated');

            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.ceil(current);
                }
            }, stepTime);
        });
    };

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('hero-content')) {
                    // Start counters when hero is visible
                    animateCounters();
                }
                entry.target.classList.add('animate-in');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to sections and elements
    document.querySelectorAll('.hero-content, .services-grid, .about-grid, .cta-container').forEach(el => {
        sectionObserver.observe(el);
    });

    // Custom Sparkle/Particle Pattern on Canvas (Simple fallback for particles.js)
    const createParticles = () => {
        const container = document.getElementById('particles-js');
        if (!container) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';

            const size = Math.random() * 3 + 'px';
            particle.style.width = size;
            particle.style.height = size;

            particle.style.position = 'absolute';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.backgroundColor = 'rgba(59, 130, 246, ' + Math.random() * 0.5 + ')';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '-2';

            // Animation
            const duration = Math.random() * 10 + 10 + 's';
            particle.style.animation = `float-particle ${duration} linear infinite`;

            container.appendChild(particle);
        }
    };

    // Add keyframes for particles to head
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float-particle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    createParticles();

    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const texts = ["Seguridad Avanzada", "Redes Estructuradas", "CRM Inteligente", "Páginas Web"];
        let count = 0;
        let index = 0;
        let currentText = '';
        let letter = '';

        (function type() {
            if (count === texts.length) {
                count = 0;
            }
            currentText = texts[count];
            letter = currentText.slice(0, ++index);

            typewriterElement.textContent = letter;
            if (letter.length === currentText.length) {
                setTimeout(() => {
                    index = 0;
                    count++;
                    setTimeout(type, 500);
                }, 2000);
            } else {
                setTimeout(type, 100);
            }
        }());
    }

    // Parallax Effect for Hero & Background Spheres
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Hero background parallax
        const heroBg = document.querySelector('.hero-section');
        if (heroBg) {
            heroBg.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        }

        // Parallax spheres
        const spheres = document.querySelectorAll('.parallax-sphere');
        spheres.forEach((sphere, index) => {
            const speed = 0.1 * (index + 1);
            sphere.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Mouse Parallax for Spheres
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const spheres = document.querySelectorAll('.parallax-sphere');
        spheres.forEach((sphere, index) => {
            const moveX = (x - 0.5) * (60 * (index + 1)); // Increased from 20
            const moveY = (y - 0.5) * (60 * (index + 1)); // Increased from 20
            sphere.style.marginLeft = `${moveX}px`;
            sphere.style.marginTop = `${moveY}px`;
        });
    });

    // Enhanced Intersection Observer for Reveal with Staggering
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('hero-content')) {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .about-grid, .crm-grid, .licenses-grid, .footer-col').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Staggered reveal for service cards
    const serviceCards = document.querySelectorAll('.service-card-flip');
    const servicesGridObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            serviceCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('active');
                }, index * 200);
            });
        }
    }, { threshold: 0.1 });

    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        servicesGridObserver.observe(servicesGrid);
    }

    serviceCards.forEach(card => {
        const inner = card.querySelector('.service-card-inner');

        card.addEventListener('mouseenter', () => {
            if (inner) inner.style.transform = 'rotateY(180deg)';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set variables for Spotlight CSS
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // ELITE FLOW: Combine Tilt + Flip in JS to avoid CSS conflict
            const rotateX = (centerY - y) / 15;
            const rotateY = (x - centerX) / 15;

            if (inner) {
                // Since this is hover, we add the 180deg flip manually in the transform
                // if we want it to stay flipped while the mouse is moving inside
                inner.style.transform = `rotateY(${180 + rotateY}deg) rotateX(${rotateX}deg)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            const inner = card.querySelector('.service-card-inner');
            if (inner) {
                inner.style.transform = 'rotateY(0deg) rotateX(0deg)';
            }
        });
    });

    // Magnetic Buttons Effect
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary-outline, .btn-portal, .btn-micro');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px) scale(1.05)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // Swiper Carousel Initialization
    const swiperContainer = document.querySelector('.premium-carousel');
    if (swiperContainer) {
        console.log("Initializing Support IT Marketing Carousel...");
        const swiper = new Swiper('.premium-carousel', {
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            speed: 1000,
            parallax: true,
            on: {
                init: function () {
                    console.log("Support IT Marketing Carousel: FLOW ACTIVE");
                }
            }
        });
    }

    // AI Badge Pulse Effect
    const aiBadge = document.querySelector('.ai-badge');
    if (aiBadge) {
        setInterval(() => {
            aiBadge.style.boxShadow = `0 0 ${20 + Math.sin(Date.now() / 500) * 10}px rgba(59, 130, 246, 0.6)`;
        }, 50);
    }
});
