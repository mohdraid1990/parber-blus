// Animation utilities
document.addEventListener('DOMContentLoaded', function() {
  // Parallax effect for banner
  const banner = document.querySelector('.banner');
  
  if (banner) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      banner.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
  }
  
  // Initialize Intersection Observer for animations
  const animatedElements = document.querySelectorAll('.service-item, .advantage-item, .portfolio-item, .process-step');
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        animationObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    animationObserver.observe(element);
    
    // Add hover animation for interactive elements
    element.addEventListener('mouseenter', function() {
      this.classList.add('hover-animated');
    });
    
    element.addEventListener('mouseleave', function() {
      this.classList.remove('hover-animated');
    });
  });
  
  // Animate services on hover
  const serviceItems = document.querySelectorAll('.service-item');
  
  serviceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.service-icon img');
      
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.service-icon img');
      
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
  
  // Animate portfolio items
  const portfolioImages = document.querySelectorAll('.portfolio-image');
  
  portfolioImages.forEach(image => {
    image.addEventListener('mouseenter', function() {
      const overlay = this.querySelector('.portfolio-overlay');
      
      if (overlay) {
        overlay.style.opacity = '1';
        
        const title = overlay.querySelector('h4');
        const description = overlay.querySelector('p');
        const button = overlay.querySelector('.btn-secondary');
        
        if (title) title.style.transform = 'translateY(0)';
        if (description) description.style.transform = 'translateY(0)';
        if (button) button.style.transform = 'translateY(0)';
      }
    });
    
    image.addEventListener('mouseleave', function() {
      const overlay = this.querySelector('.portfolio-overlay');
      
      if (overlay) {
        overlay.style.opacity = '0';
        
        const title = overlay.querySelector('h4');
        const description = overlay.querySelector('p');
        const button = overlay.querySelector('.btn-secondary');
        
        if (title) title.style.transform = 'translateY(-20px)';
        if (description) description.style.transform = 'translateY(20px)';
        if (button) button.style.transform = 'translateY(20px)';
      }
    });
  });
  
  // Animate numbers in statistics section
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        const duration = 2000; // ms
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;
        
        const counter = setInterval(() => {
          frame++;
          const progress = frame / totalFrames;
          const currentCount = Math.round(progress * target);
          
          if (frame === totalFrames) {
            entry.target.textContent = target;
            clearInterval(counter);
          } else {
            entry.target.textContent = currentCount;
          }
        }, frameDuration);
        
        numberObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(number => {
    numberObserver.observe(number);
  });
  
  // Add typing animation to banner heading
  const bannerHeading = document.querySelector('.banner h1');
  
  if (bannerHeading) {
    const text = bannerHeading.textContent;
    bannerHeading.textContent = '';
    
    const typingSpeed = 50; // ms per character
    let charIndex = 0;
    
    function typeText() {
      if (charIndex < text.length) {
        bannerHeading.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
      }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeText, 500);
  }
  
  // Reveal animations for sections
  const sections = document.querySelectorAll('.section');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
});