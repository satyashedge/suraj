// Light color palettes
const lightColorPalettes = [
    {
        primary: '#64B5F6',
        secondary: '#81C784',
        background: '#F5F5F5',
        text: '#333333',
        card: '#FFFFFF'
    },
    {
        primary: '#FFB74D',
        secondary: '#FF8A65',
        background: '#FFF3E0',
        text: '#424242',
        card: '#FFFFFF'
    },
    {
        primary: '#BA68C8',
        secondary: '#F06292',
        background: '#F3E5F5',
        text: '#424242',
        card: '#FFFFFF'
    },
    {
        primary: '#4FC3F7',
        secondary: '#4DD0E1',
        background: '#E1F5FE',
        text: '#424242',
        card: '#FFFFFF'
    }
];

// Current palette index
let currentPaletteIndex = 0;

// Theme toggle with time limit
let themeToggleEnabled = true;
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Disable theme toggle after 20 seconds
setTimeout(() => {
    themeToggleEnabled = false;
    themeToggle.style.opacity = '0.5';
    themeToggle.style.cursor = 'not-allowed';
}, 20000); // 20 seconds

themeToggle.addEventListener('click', () => {
    if (!themeToggleEnabled) {
        // Show message that theme toggle is disabled
        showNotification('Theme switching is now locked', 'info');
        return;
    }
    
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    icon.classList.toggle('fa-sun');
    icon.classList.toggle('fa-moon');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.toggle('dark-mode', savedTheme === 'dark');
    body.classList.toggle('light-mode', savedTheme === 'light');
}

// Theme Toggle Functionality
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

// Initialize theme
(function () {
    if (localStorage.getItem('theme') === 'dark') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
})();

// Function to apply color palette
function applyColorPalette(palette) {
    document.documentElement.style.setProperty('--primary-light', palette.primary);
    document.documentElement.style.setProperty('--secondary-light', palette.secondary);
    document.documentElement.style.setProperty('--background-light', palette.background);
    document.documentElement.style.setProperty('--text-light', palette.text);
    document.documentElement.style.setProperty('--card-light', palette.card);
}

// Function to rotate color palette
function rotateColorPalette() {
    currentPaletteIndex = (currentPaletteIndex + 1) % lightColorPalettes.length;
    applyColorPalette(lightColorPalettes[currentPaletteIndex]);
}

// Initial color palette
applyColorPalette(lightColorPalettes[0]);

// Rotate colors every 20 seconds
setInterval(rotateColorPalette, 20000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const submitBtn = contactForm.querySelector('.submit-btn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Get form data
    const formData = new FormData(contactForm);
    const formDataObj = Object.fromEntries(formData.entries());
    
    // Basic validation
    if (!validateForm(formDataObj)) {
        submitBtn.classList.remove('loading');
        return;
    }

    try {
        // Here you would typically send the form data to your backend
        // For now, we'll simulate a submission with a timeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        contactForm.reset();
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.classList.remove('loading');
    }
});

function validateForm(data) {
    // Name validation
    if (data.name.trim().length < 2) {
        showNotification('Please enter a valid name', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Subject validation
    if (data.subject.trim().length < 2) {
        showNotification('Please enter a subject', 'error');
        return false;
    }
    
    // Message validation
    if (data.message.trim().length < 10) {
        showNotification('Message must be at least 10 characters long', 'error');
        return false;
    }
    
    return true;
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        zIndex: '1000',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        background: type === 'success' ? '#4CAF50' : '#f44336'
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Loader
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader-wrapper');
    
    // Hide loader after animations complete
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 2000);
});
