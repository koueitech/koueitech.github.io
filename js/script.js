// Navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Hero background image slider
const heroElement = document.getElementById('hero');
const heroImages = ['hero1.jpg', 'hero2.jpg', 'hero3.jpg'];
let currentImageIndex = 0;

// Set initial background
heroElement.style.backgroundImage = `url('images/${heroImages[currentImageIndex]}')`;

// Change background image every 5 seconds
setInterval(() => {
  currentImageIndex = (currentImageIndex + 1) % heroImages.length;
  heroElement.style.opacity = '0';
  
  setTimeout(() => {
    heroElement.style.backgroundImage = `url('images/${heroImages[currentImageIndex]}')`;
    heroElement.style.opacity = '1';
  }, 500);
}, 5000);

// Add fade transition
heroElement.style.transition = 'opacity 1s ease';

// FAQ toggle
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    // Close other open FAQs
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });
    
    // Toggle current FAQ
    item.classList.toggle('active');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Offset for fixed navigation
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll event for navigation background
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  
  if (window.scrollY > 100) {
    nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});
