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

// Hero background image slider with overlapping fade effect
// With gray overlay for better text visibility
// Fixed index management for continuous transitions
const heroElement = document.getElementById('hero');
const heroImages = ['hero1.jpg', 'hero2.jpg', 'hero3.jpg'];
let currentImageIndex = 0;
let activeElementIndex = 0; // トラッキング用の新しい変数

// Style the main hero container to handle positioning
heroElement.style.position = 'relative';
heroElement.style.overflow = 'hidden';

// Create background container that will hold our image layers
const bgContainer = document.createElement('div');
bgContainer.className = 'hero-background-container';
bgContainer.style.position = 'absolute';
bgContainer.style.top = '0';
bgContainer.style.left = '0';
bgContainer.style.width = '100%';
bgContainer.style.height = '100%';
bgContainer.style.zIndex = '0'; // Ensure it stays behind the content

// Create two background layers for crossfade
const bg1 = document.createElement('div');
bg1.className = 'hero-bg';
bg1.style.backgroundImage = `url('images/${heroImages[currentImageIndex]}')`;
bg1.style.opacity = '1';

const bg2 = document.createElement('div');
bg2.className = 'hero-bg';
bg2.style.backgroundImage = `url('images/${heroImages[(currentImageIndex + 1) % heroImages.length]}')`;
bg2.style.opacity = '0';

// Add to background container
bgContainer.appendChild(bg1);
bgContainer.appendChild(bg2);

// Create a gray overlay for better text visibility
const overlay = document.createElement('div');
overlay.className = 'hero-overlay';
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(42, 49, 68, 0.47)'; // Semi-transparent gray overlay
overlay.style.zIndex = '0'; // Same z-index as backgrounds, but positioned after them

// Add the overlay after the background layers
bgContainer.appendChild(overlay);

// Insert the background container as the first child of the hero element
heroElement.insertBefore(bgContainer, heroElement.firstChild);

// Apply styles for both background elements
const bgElements = [bg1, bg2];
bgElements.forEach(el => {
  el.style.position = 'absolute';
  el.style.top = '0';
  el.style.left = '0';
  el.style.width = '100%';
  el.style.height = '100%';
  el.style.backgroundSize = 'cover';
  el.style.backgroundPosition = 'center';
  el.style.transition = 'opacity 5s ease';
});

// Ensure any content inside the hero has proper positioning
const heroContent = Array.from(heroElement.children).filter(child => child !== bgContainer);
heroContent.forEach(element => {
  // Make sure content is positioned above the background
  if (getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
  }
  element.style.zIndex = '1';
  
  // Optional: make text color white for better contrast with overlay
  const textElements = element.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button');
  textElements.forEach(textEl => {
    if (!textEl.style.color) {
      textEl.style.color = 'white';
    }
  });
});

// Improved crossFade function with better index management
function crossFade() {
  // Calculate indices properly
  const nextActiveElementIndex = 1 - activeElementIndex; // 0->1, 1->0 で切り替え
  const nextImageIndex = (currentImageIndex + 1) % heroImages.length;
  
  // Get current active and next active elements
  const activeElement = bgElements[activeElementIndex];
  const nextElement = bgElements[nextActiveElementIndex];
  
  // Set the next background image
  nextElement.style.backgroundImage = `url('images/${heroImages[nextImageIndex]}')`;
  
  // Perform crossfade
  activeElement.style.opacity = '0';
  nextElement.style.opacity = '1';
  
  // Update indices for next iteration
  currentImageIndex = nextImageIndex;
  activeElementIndex = nextActiveElementIndex;
}

// For debugging
console.log('Initial setup: Active element index:', activeElementIndex, 'Current image index:', currentImageIndex);

// Change background image every 8 seconds
setInterval(() => {
  crossFade();
  console.log('After transition: Active element index:', activeElementIndex, 'Current image index:', currentImageIndex);
}, 8000);

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
