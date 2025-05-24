// DOM Elements
const header = document.getElementById('header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const requestButtons = document.querySelectorAll('.request-btn');
const requestModal = document.getElementById('request-modal');
const modalClose = document.querySelector('.modal-close');
const backToTop = document.querySelector('.back-to-top');
const faqItems = document.querySelectorAll('.faq-item');
const portfolioFilters = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Scroll event listener
window.addEventListener('scroll', function() {
  // Header scroll class
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Back to top button visibility
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
  
  // Animate elements on scroll
  animateOnScroll();
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', function() {
  mobileMenuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('show');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', function() {
    mobileMenuToggle.classList.remove('active');
    mobileMenu.classList.remove('show');
  });
});

// Request modal
requestButtons.forEach(button => {
  button.addEventListener('click', function() {
    requestModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside
requestModal.addEventListener('click', function(e) {
  if (e.target === requestModal) {
    closeModal();
  }
});

function closeModal() {
  requestModal.classList.remove('show');
  document.body.style.overflow = '';
}

// Back to top button
backToTop.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// FAQ accordion
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', function() {
    const isActive = item.classList.contains('active');
    
    // Close all items
    faqItems.forEach(faqItem => {
      faqItem.classList.remove('active');
    });
    
    // If the clicked item wasn't active, open it
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Portfolio filter
portfolioFilters.forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons
    portfolioFilters.forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    this.classList.add('active');
    
    const filter = this.getAttribute('data-filter');
    
    // Show/hide portfolio items based on filter
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Promo timer
function updateTimer() {
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const timeLeft = endOfMonth - now;
  
  if (timeLeft <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }
  
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  document.getElementById('days').textContent = days < 10 ? '0' + days : days;
  document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
  document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
}

// Update timer every second
setInterval(updateTimer, 1000);
updateTimer(); // Initial call

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize animations
function initAnimations() {
  // Add animation delays based on element index
  document.querySelectorAll('[data-aos]').forEach((element, index) => {
    if (!element.getAttribute('data-aos-delay')) {
      const baseDelay = element.parentElement.classList.contains('services-grid') || 
                        element.parentElement.classList.contains('advantages-grid') || 
                        element.parentElement.classList.contains('portfolio-grid') ? 100 : 0;
      
      if (baseDelay > 0) {
        const delay = index % 4 * baseDelay;
        element.setAttribute('data-aos-delay', delay);
      }
    }
  });
  
  // Initially check which elements should be animated
  animateOnScroll();
}

// Animate elements on scroll
function animateOnScroll() {
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;
  
  document.querySelectorAll('[data-aos]').forEach(element => {
    const elementTop = element.getBoundingClientRect().top + scrollY;
    const elementVisible = 150;
    
    if (scrollY + windowHeight > elementTop + elementVisible) {
      element.classList.add('aos-animate');
    }
  });
}

// Animate counter
function animateCounter() {
  const statItems = document.querySelectorAll('.stat-number');
  
  statItems.forEach(item => {
    const target = parseInt(item.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 16ms per frame (approx 60fps)
    let current = 0;
    
    function updateCounter() {
      current += step;
      
      if (current >= target) {
        item.textContent = target;
        return;
      }
      
      item.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    }
    
    // Only start counter animation when element is in viewport
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(item);
  });
}

// Form validation
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    let isValid = true;
    
    // Basic validation
    for (const [key, value] of formData.entries()) {
      const input = form.querySelector(`[name="${key}"]`);
      
      if (input.hasAttribute('required') && !value) {
        input.style.borderColor = 'red';
        isValid = false;
      } else {
        input.style.borderColor = '';
      }
    }
    
    if (isValid) {
      // Submit form - in real implementation would send data to server
      const successMessage = document.createElement('div');
      successMessage.classList.add('success-message');
      successMessage.textContent = 'Спасибо! Ваша заявка успешно отправлена.';
      
      form.innerHTML = '';
      form.appendChild(successMessage);
      
      // Close modal after successful submission
      if (form.id === 'modal-form') {
        setTimeout(() => {
          closeModal();
        }, 3000);
      }
    }
  });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initAnimations();
  animateCounter();
});