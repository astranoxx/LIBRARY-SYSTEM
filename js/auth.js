document.addEventListener('DOMContentLoaded', function() {
  // Tab switching
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');
  
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and forms
      authTabs.forEach(t => t.classList.remove('active'));
      authForms.forEach(f => f.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Show corresponding form
      const formId = `${tab.dataset.tab}-form`;
      document.getElementById(formId).classList.add('active');
    });
  });
  
  // Show/hide student fields based on role selection
  const registerRole = document.getElementById('register-role');
  const studentFields = document.querySelectorAll('.student-fields');
  
  if (registerRole) {
    registerRole.addEventListener('change', function() {
      if (this.value === 'student') {
        studentFields.forEach(field => field.classList.remove('hidden'));
      } else {
        studentFields.forEach(field => field.classList.add('hidden'));
      }
    });
  }
  
  // Login form submit
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      const role = document.getElementById('login-role').value;
      const id = document.getElementById('login-id').value;
      const password = document.getElementById('login-password').value;
      
      // Simple validation
      if (!role || !id || !password) {
        alert('Please fill in all fields.');
        return;
      }
      
      // In a real application, you would send this data to the server for authentication
      // For demonstration purposes, we'll redirect based on role
      
      // Store user info in localStorage for demo purposes
      const user = {
        role: role,
        id: id,
        name: 'John Doe' // In a real app, this would come from the server
      };
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Redirect based on role
      if (role === 'admin') {
        window.location.href = 'admin/dashboard.html';
      } else {
        window.location.href = 'student/dashboard.html';
      }
    });
  }
  
  // Registration form submit
  const registerBtn = document.getElementById('register-btn');
  if (registerBtn) {
    registerBtn.addEventListener('click', function() {
      const role = document.getElementById('register-role').value;
      const lastName = document.getElementById('register-lastname').value;
      const firstName = document.getElementById('register-firstname').value;
      const middleName = document.getElementById('register-middlename').value;
      const email = document.getElementById('register-email').value;
      const id = document.getElementById('register-id').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm').value;
      
      // Additional fields for students
      let course = '';
      let year = '';
      let section = '';
      
      if (role === 'student') {
        course = document.getElementById('register-course').value;
        year = document.getElementById('register-year').value;
        section = document.getElementById('register-section').value;
        
        if (!course || !year || !section) {
          alert('Please fill in all student-specific fields.');
          return;
        }
      }
      
      // Simple validation
      if (!role || !lastName || !firstName || !email || !id || !password) {
        alert('Please fill in all required fields.');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // In a real application, you would send this data to the server for registration
      // For demonstration purposes, we'll show a success message and redirect to login
      
      // Create user object for demo
      const user = {
        role: role,
        lastName: lastName,
        firstName: firstName,
        middleName: middleName,
        email: email,
        id: id,
        course: course,
        year: year,
        section: section
      };
      
      // Store in localStorage for demo (in a real app, this would be in a database)
      localStorage.setItem('registeredUser', JSON.stringify(user));
      
      alert('Registration successful! Please login with your credentials.');
      
      // Switch to login tab
      document.querySelector('.auth-tab[data-tab="login"]').click();
    });
  }
});