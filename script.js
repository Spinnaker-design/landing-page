// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 20; // Small offset for better positioning
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.step-item, .benefit-item, .perk-card, .benefit-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add glitch effect to titles
    const titles = document.querySelectorAll('.section-title, .hero-title');
    titles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.classList.add('glitch');
        });
        
        title.addEventListener('mouseleave', function() {
            this.classList.remove('glitch');
        });
    });

    // Add neon pulse effect to buttons
    const buttons = document.querySelectorAll('.primary-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 40px rgba(129, 0, 250, 0.8), 0 0 60px rgba(67, 250, 0, 0.6)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 0 20px rgba(129, 0, 250, 0.5)';
        });
    });

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-robot, .floating-gear, .floating-circuit');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .step-item, .benefit-item, .perk-card, .benefit-card {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        .step-item.animate-in, .benefit-item.animate-in, .perk-card.animate-in, .benefit-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            border: 2px solid #43FA00;
            background: rgba(0, 0, 0, 0.9);
            box-shadow: 0 0 20px rgba(67, 250, 0, 0.5);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-color: #43FA00;
            box-shadow: 0 0 20px rgba(67, 250, 0, 0.5);
        }
        
        .notification.error {
            border-color: #FF0080;
            box-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
        }
        
        /* Enhanced 80s effects */
        @keyframes neon-flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        
        @keyframes scanline {
            0% { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
        }
        
        .neon-flicker {
            animation: neon-flicker 2s infinite;
        }
        
        .scanline {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: rgba(67, 250, 0, 0.5);
            animation: scanline 8s linear infinite;
            pointer-events: none;
            z-index: 9998;
        }
        
        /* Matrix rain effect */
        .matrix-rain {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9997;
            opacity: 0.1;
        }
        
        .matrix-char {
            position: absolute;
            color: #43FA00;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            animation: matrix-fall 3s linear infinite;
        }
        
        @keyframes matrix-fall {
            0% { transform: translateY(-100px); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Create scanline effect
    createScanline();
    
    // Create matrix rain effect
    createMatrixRain();
});

// Create scanline effect
function createScanline() {
    const scanline = document.createElement('div');
    scanline.className = 'scanline';
    document.body.appendChild(scanline);
}

// Create matrix rain effect
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    document.body.appendChild(matrixContainer);
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createMatrixChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDelay = Math.random() * 3 + 's';
        char.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        matrixContainer.appendChild(char);
        
        // Remove character after animation
        setTimeout(() => {
            char.remove();
        }, 5000);
    }
    
    // Create characters periodically
    setInterval(createMatrixChar, 100);
}

// Notification function
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Hero carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // No filters applied - images display naturally
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance carousel every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initialize first slide
    showSlide(0);
});

// Add typing effect for hero title
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const lines = heroTitle.querySelectorAll('.title-line');
        lines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                line.style.transition = 'all 1s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 400);
        });
    }
});

// Add particle effect to hero section
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        // Create particles
        for (let i = 0; i < 30; i++) {
            createParticle(hero);
        }
    }
});

function createParticle(container) {
    const particle = document.createElement('div');
    const colors = ['#43FA00', '#F2FA00', '#8100FA', '#FF0080', '#00FFFF'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: ${randomColor};
        border-radius: 50%;
        pointer-events: none;
        animation: particle-float 10s infinite linear;
        box-shadow: 0 0 10px ${randomColor};
    `;
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 10 + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, 10000);
}

// Add CSS for particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle-float {
        0% {
            transform: translateY(0) translateX(0) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: translateY(-20px) translateX(10px) scale(1);
        }
        90% {
            opacity: 1;
            transform: translateY(-80px) translateX(40px) scale(1);
        }
        100% {
            transform: translateY(-100px) translateX(50px) scale(0);
            opacity: 0;
        }
    }
    
    /* Enhanced hover effects */
    .benefit-item:hover i,
    .perk-card:hover .perk-icon,
    .benefit-card:hover .benefit-icon {
        animation: icon-pulse 0.5s ease-in-out infinite alternate;
    }
    
    /* Glitch effect for interactive elements */
    .step-item:hover,
    .benefit-item:hover,
    .perk-card:hover,
    .benefit-card:hover {
        animation: glitch 0.3s ease-in-out;
    }
    
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
    
    /* Neon text effect */
    .hero-logo .logo-text {
        text-shadow: 
            0 0 5px currentColor,
            0 0 10px currentColor,
            0 0 15px currentColor,
            0 0 20px currentColor;
    }
    
    .benefit-card h4 {
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }
    
    .section-title {
        text-shadow: 0 0 8px var(--neon-green);
    }
    
    .benefit-item h3 {
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }
    
    .perk-card h3 {
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }
    
    .why-hauling .section-title {
        text-shadow: 0 0 8px var(--neon-green);
    }
`;
document.head.appendChild(particleStyle);

// Add keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) return;
    
    if (e.key === 'ArrowLeft') {
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        if (prevBtn) prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        if (nextBtn) nextBtn.click();
    }
});

// Add touch/swipe support for carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) return;
    
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next slide
                const nextBtn = carousel.querySelector('.carousel-btn.next');
                if (nextBtn) nextBtn.click();
            } else {
                // Swipe right - previous slide
                const prevBtn = carousel.querySelector('.carousel-btn.prev');
                if (prevBtn) prevBtn.click();
            }
        }
    }
});
