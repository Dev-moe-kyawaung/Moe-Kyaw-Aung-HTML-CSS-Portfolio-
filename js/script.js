// ==========================================
// CONFIGURATION & CONSTANTS
// ==========================================

const CONFIG = {
    PROJECTS: [
        {
            id: 1,
            icon: '🛒',
            category: 'E-Commerce',
            title: 'Premium E-Commerce Platform',
            description: 'Full-stack e-commerce solution with React frontend, Node.js backend, MongoDB database, and Stripe payment integration. Features include product catalog, shopping cart, user authentication, and order management.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
            github: 'https://github.com/Dev-moe-kyawaung/ecommerce',
            demo: '#'
        },
        {
            id: 2,
            icon: '💬',
            category: 'Real-time',
            title: 'Real-time Chat Application',
            description: 'WebSocket-based messaging platform with Socket.io, featuring real-time notifications, user authentication with JWT, message history, and typing indicators. Built with Express and MongoDB.',
            technologies: ['Socket.io', 'Express', 'JWT', 'MongoDB', 'React'],
            github: 'https://github.com/Dev-moe-kyawaung/chat-app',
            demo: '#'
        },
        {
            id: 3,
            icon: '✓',
            category: 'Productivity',
            title: 'Collaborative Task Management',
            description: 'Project management tool with drag-and-drop interface, real-time collaboration, team management, task assignment, and progress tracking. Deployed on AWS with CI/CD pipeline.',
            technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker'],
            github: 'https://github.com/Dev-moe-kyawaung/task-manager',
            demo: '#'
        },
        {
            id: 4,
            icon: '📊',
            category: 'Analytics',
            title: 'Real-time Analytics Dashboard',
            description: 'Data visualization dashboard with interactive charts, real-time data updates, customizable widgets, and advanced filtering. Uses D3.js and Chart.js for visualizations.',
            technologies: ['React', 'D3.js', 'Chart.js', 'Node.js', 'PostgreSQL'],
            github: 'https://github.com/Dev-moe-kyawaung/analytics',
            demo: '#'
        },
        {
            id: 5,
            icon: '🎬',
            category: 'Media',
            title: 'Video Streaming Platform',
            description: 'Streaming service with video upload, transcoding, adaptive bitrate streaming, user recommendations using machine learning, and content management system.',
            technologies: ['React', 'Node.js', 'FFmpeg', 'MongoDB', 'ML'],
            github: 'https://github.com/Dev-moe-kyawaung/streaming',
            demo: '#'
        },
        {
            id: 6,
            icon: '🏥',
            category: 'Healthcare',
            title: 'Healthcare Management System',
            description: 'Complete healthcare solution with appointment booking, patient records management, doctor scheduling, prescription management, and telemedicine integration.',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Twilio', 'Stripe'],
            github: 'https://github.com/Dev-moe-kyawaung/healthcare',
            demo: '#'
        }
    ]
};

// ==========================================
// DOM ELEMENTS
// ==========================================

const elements = {
    body: document.body,
    html: document.documentElement,
    header: document.querySelector('.fixed-header'),
    hamburger: document.getElementById('hamburger'),
    mobileMenu: document.getElementById('mobile-menu'),
    desktopMenu: document.getElementById('desktop-menu'),
    themeToggle: document.getElementById('theme-toggle'),
    contactForm: document.getElementById('contact-form'),
    newsletterForm: document.getElementById('newsletter-form'),
    projectsGrid: document.getElementById('projects-grid'),
    navLinks: document.querySelectorAll('.nav-link')
};

// ==========================================
// THEME MANAGEMENT
// ==========================================

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        elements.themeToggle.addEventListener('click', () => this.toggle());
    }

    applyTheme() {
        if (this.theme === 'dark') {
            elements.html.classList.add('dark');
            elements.body.classList.add('dark-mode');
            elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i><span class="theme-text">Light</span>';
        } else {
            elements.html.classList.remove('dark');
            elements.body.classList.remove('dark-mode');
            elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i><span class="theme-text">Dark</span>';
        }
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }
}

// ==========================================
// MOBILE MENU MANAGEMENT
// ==========================================

class MobileMenuManager {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        elements.hamburger.addEventListener('click', () => this.toggle());
        elements.navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        elements.hamburger.classList.add('active');
        elements.mobileMenu.classList.add('active');
    }

    close() {
        this.isOpen = false;
        elements.hamburger.classList.remove('active');
        elements.mobileMenu.classList.remove('active');
    }
}

// ==========================================
// PROJECTS MANAGER
// ==========================================

class ProjectsManager {
    constructor() {
        this.projects = CONFIG.PROJECTS;
        this.render();
    }

    render() {
        const html = this.projects.map((project, idx) => `
            <div class="project-card" data-aos="fade-up" style="animation-delay: ${idx * 0.1}s;">
                <div class="project-image">${project.icon}</div>
                <div class="project-content">
                    <span class="project-category">${project.category}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                            <i class="fab fa-github"></i> Code
                        </a>
                        <a href="${project.demo}" class="project-link">
                            <i class="fas fa-external-link-alt"></i> Demo
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        elements.projectsGrid.innerHTML = html;
    }
}

// ==========================================
// FORM MANAGER
// ==========================================

class FormManager {
    constructor() {
        this.init();
    }

    init() {
        elements.contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
        elements.newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    validateContactForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        if (name.length < 2) {
            this.showError('name-error', 'Name must be at least 2 characters');
            isValid = false;
        } else {
            this.clearError('name-error');
        }

        if (!this.validateEmail(email)) {
            this.showError('email-error', 'Please enter a valid email');
            isValid = false;
        } else {
            this.clearError('email-error');
        }

        if (subject.length < 3) {
            this.showError('subject-error', 'Subject must be at least 3 characters');
            isValid = false;
        } else {
            this.clearError('subject-error');
        }

        if (message.length < 10) {
            this.showError('message-error', 'Message must be at least 10 characters');
            isValid = false;
        } else {
            this.clearError('message-error');
        }

        return isValid;
    }

    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    async handleContactSubmit(e) {
        e.preventDefault();

        if (!this.validateContactForm()) return;

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        const statusElement = document.getElementById('form-status');

        try {
            // Simulate sending email (in production, use a backend service)
            statusElement.classList.add('success');
            statusElement.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';

            elements.contactForm.reset();

            setTimeout(() => {
                statusElement.classList.remove('success');
                statusElement.textContent = '';
            }, 5000);

            console.log('Form submitted:', formData);
        } catch (error) {
            statusElement.classList.add('error');
            statusElement.textContent = '✗ Error sending message. Please try again.';
            console.error('Error:', error);
        }
    }

    handleNewsletterSubmit(e) {
        e.preventDefault();

        const email = e.target.querySelector('input[type="email"]').value.trim();

        if (!this.validateEmail(email)) {
            alert('Please enter a valid email');
            return;
        }

        // Simulate subscription
        alert('Thank you for subscribing!');
        e.target.reset();

        console.log('Newsletter subscription:', email);
    }
}

// ==========================================
// SCROLL EFFECTS
// ==========================================

class ScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const header = elements.header;
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
}

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

class ScrollObserver {
    constructor() {
        this.init();
    }

    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ==========================================
// PERFORMANCE MONITORING
// ==========================================

class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                this.logMetrics();
            });
        }
    }

    logMetrics() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    }
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileMenuManager();
    new ProjectsManager();
    new FormManager();
    new ScrollEffects();
    new ScrollObserver();
    new SmoothScroll();
    new PerformanceMonitor();

    console.log('%cWelcome to Dev Moe Kyawaung\'s Portfolio!', 'color: #9333ea; font-size: 16px; font-weight: bold;');
});

// ==========================================
// ERROR HANDLING
// ==========================================

window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Rejection:', event.reason);
});

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
