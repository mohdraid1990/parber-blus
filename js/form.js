// Form handling functionality
document.addEventListener('DOMContentLoaded', function() {
  // Form elements
  const forms = document.querySelectorAll('form');
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  
  // Phone number mask
  phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      let formattedValue = '';
      
      if (value.length > 0) {
        // Format as +7 (xxx) xxx-xx-xx
        if (value[0] !== '7') {
          value = '7' + value;
        }
        
        formattedValue = '+7';
        
        if (value.length > 1) {
          formattedValue += ' (' + value.substring(1, 4);
        }
        
        if (value.length > 4) {
          formattedValue += ') ' + value.substring(4, 7);
        }
        
        if (value.length > 7) {
          formattedValue += '-' + value.substring(7, 9);
        }
        
        if (value.length > 9) {
          formattedValue += '-' + value.substring(9, 11);
        }
      }
      
      e.target.value = formattedValue;
    });
  });
  
  // Form validation
  forms.forEach(form => {
    // Input validation on blur
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateInput(input);
      });
      
      input.addEventListener('input', function() {
        // Remove error state when user starts typing
        input.classList.remove('error');
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) {
          errorMessage.remove();
        }
      });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Validate all inputs
      inputs.forEach(input => {
        if (!validateInput(input)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';
        
        // Simulate server request with timeout
        setTimeout(() => {
          // Success message
          const formContent = form.innerHTML;
          form.innerHTML = `
            <div class="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h4>Спасибо за вашу заявку!</h4>
              <p>Мы свяжемся с вами в ближайшее время.</p>
            </div>
          `;
          
          // Reset form after 5 seconds (for consultation form)
          if (form.id === 'consultation-form' || form.id === 'feedback-form') {
            setTimeout(() => {
              form.innerHTML = formContent;
              const newSubmitButton = form.querySelector('button[type="submit"]');
              newSubmitButton.disabled = false;
              newSubmitButton.textContent = originalText;
              
              // Reattach event listeners
              const newInputs = form.querySelectorAll('input, textarea, select');
              newInputs.forEach(input => {
                input.addEventListener('blur', function() {
                  validateInput(input);
                });
                
                input.addEventListener('input', function() {
                  input.classList.remove('error');
                  const errorMessage = input.parentElement.querySelector('.error-message');
                  if (errorMessage) {
                    errorMessage.remove();
                  }
                });
              });
            }, 5000);
          }
          
          // Close modal after 3 seconds (for modal form)
          if (form.id === 'modal-form') {
            setTimeout(() => {
              const modal = document.getElementById('request-modal');
              modal.classList.remove('show');
              document.body.style.overflow = '';
              
              // Reset form
              setTimeout(() => {
                form.innerHTML = formContent;
                const newSubmitButton = form.querySelector('button[type="submit"]');
                newSubmitButton.disabled = false;
                newSubmitButton.textContent = originalText;
              }, 500);
            }, 3000);
          }
        }, 2000);
      }
    });
  });
  
  // Input validation function
  function validateInput(input) {
    const value = input.value.trim();
    const errorMessage = input.parentElement.querySelector('.error-message');
    
    // Remove previous error message
    if (errorMessage) {
      errorMessage.remove();
    }
    
    // Skip validation for non-required empty fields
    if (!input.hasAttribute('required') && value === '') {
      input.classList.remove('error');
      return true;
    }
    
    // Required field validation
    if (input.hasAttribute('required') && value === '') {
      showError(input, 'Это поле обязательно для заполнения');
      return false;
    }
    
    // Email validation
    if (input.type === 'email' && value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showError(input, 'Введите корректный email адрес');
        return false;
      }
    }
    
    // Phone validation
    if (input.type === 'tel' && value !== '') {
      const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
      if (!phoneRegex.test(value)) {
        showError(input, 'Введите корректный номер телефона');
        return false;
      }
    }
    
    // Agreement checkbox validation
    if (input.type === 'checkbox' && input.name.includes('agreement') && !input.checked) {
      showError(input, 'Необходимо согласие с условиями');
      return false;
    }
    
    input.classList.remove('error');
    return true;
  }
  
  // Show error message function
  function showError(input, message) {
    input.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    input.parentElement.appendChild(errorElement);
  }
  
  // Custom select styling
  const customSelects = document.querySelectorAll('select');
  
  customSelects.forEach(select => {
    select.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    select.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
});