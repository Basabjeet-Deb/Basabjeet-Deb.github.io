// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// DOM Elements
const preloader = document.getElementById('preloader');
const progressBar = document.getElementById('progressBar');
const header = document.getElementById('header');
const cursorDot = document.getElementById('cursorDot');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
    
    // Header scroll effect
    if (winScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Cursor hover effects
document.querySelectorAll('a, button').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(3)';
        cursorDot.style.background = 'var(--accent-secondary)';
    });
    
    elem.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorDot.style.background = 'var(--accent-primary)';
    });
});

// Mobile Menu Toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-active');
        menuToggle.classList.toggle('active');
    });
}

// Active Nav Link
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Observe stat values for animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.hasAttribute('data-value')) {
            const target = parseInt(entry.target.getAttribute('data-value'));
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all stat values
document.querySelectorAll('[data-value]').forEach(stat => {
    observer.observe(stat);
});

// Add parallax effect to hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add typing effect to hero title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, text, 50);
        }, 1500);
    }
});