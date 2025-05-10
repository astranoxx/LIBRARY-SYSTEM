document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    // Redirect to login page if not logged in
    window.location.href = '../index.html';
    return;
  }
  
  // Verify user is admin
  if (currentUser.role !== 'admin') {
    alert('Access denied. Admin permissions required.');
    window.location.href = '../index.html';
    return;
  }
  
  // Set user information in the UI
  const userNameElements = document.querySelectorAll('#user-name');
  userNameElements.forEach(element => {
    element.textContent = currentUser.name;
  });
  
  // Profile dropdown toggle
  const profileToggle = document.querySelector('.profile-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  if (profileToggle && dropdownMenu) {
    profileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdownMenu.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
      dropdownMenu.classList.remove('active');
    });
    
    // Prevent dropdown from closing when clicking inside it
    dropdownMenu.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  // Logout functionality
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      // Clear user data from localStorage
      localStorage.removeItem('currentUser');
      
      // Redirect to login page
      window.location.href = '../index.html';
    });
  }
  
  // Card tabs switching
  const cardTabs = document.querySelectorAll('.card-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (cardTabs.length > 0 && tabContents.length > 0) {
    cardTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs and contents
        cardTabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding tab content
        const tabId = tab.dataset.tab;
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
  
  // Category filter buttons
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  if (categoryButtons.length > 0) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // In a real app, you'd filter the table based on the selected category
        const category = button.dataset.category;
        console.log(`Filter by category: ${category}`);
        
        // For demo purposes, we'll just log the category
        // In a real app, you'd update the table data
      });
    });
  }
  
  // Book modal
  const addBookBtn = document.getElementById('add-book-btn');
  const bookModal = document.getElementById('book-modal');
  const bookModalTitle = document.getElementById('book-modal-title');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  
  if (addBookBtn && bookModal) {
    // Open modal for adding a new book
    addBookBtn.addEventListener('click', function() {
      bookModalTitle.textContent = 'Add New Book';
      
      // Clear form fields
      const formFields = bookModal.querySelectorAll('input, select, textarea');
      formFields.forEach(field => {
        field.value = '';
      });
      
      bookModal.classList.add('active');
    });
    
    // Open modal for editing a book
    const editButtons = document.querySelectorAll('.btn-icon[title="Edit"]');
    editButtons.forEach(button => {
      button.addEventListener('click', function() {
        bookModalTitle.textContent = 'Edit Book';
        
        // Get book data from the row (in a real app, you'd fetch this from the server)
        const row = this.closest('tr');
        const title = row.querySelector('td:nth-child(2)').textContent.trim();
        const author = row.querySelector('td:nth-child(3)').textContent.trim();
        const isbn = row.querySelector('td:nth-child(4)').textContent.trim();
        const subject = row.querySelector('td:nth-child(5)').textContent.trim();
        const location = row.querySelector('td:nth-child(6)').textContent.trim();
        const stock = row.querySelector('td:nth-child(7) .stock-badge').textContent.trim();
        
        // Populate form fields
        document.getElementById('book-title').value = title;
        document.getElementById('book-author').value = author;
        document.getElementById('book-isbn').value = isbn;
        document.getElementById('book-copies').value = stock;
        
        // Set select values (would need to match values in the options)
        const subjectSelect = document.getElementById('book-subject');
        const locationSelect = document.getElementById('book-location');
        
        // In a real app, you'd match the text to the corresponding option value
        // For demo purposes, we'll just use default options
        
        bookModal.classList.add('active');
      });
    });
    
    // Close modals
    if (closeModalButtons.length > 0) {
      closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
          const modal = this.closest('.modal');
          if (modal) {
            modal.classList.remove('active');
          }
        });
      });
    }
    
    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });
    
    // Save book
    const saveBookBtn = document.getElementById('save-book');
    if (saveBookBtn) {
      saveBookBtn.addEventListener('click', function() {
        const title = document.getElementById('book-title').value;
        const author = document.getElementById('book-author').value;
        const isbn = document.getElementById('book-isbn').value;
        const publisher = document.getElementById('book-publisher').value;
        const year = document.getElementById('book-year').value;
        const edition = document.getElementById('book-edition').value;
        const subject = document.getElementById('book-subject').value;
        const location = document.getElementById('book-location').value;
        const copies = document.getElementById('book-copies').value;
        const description = document.getElementById('book-description').value;
        
        // Simple validation
        if (!title || !author || !isbn || !subject || !location || !copies) {
          alert('Please fill in all required fields.');
          return;
        }
        
        // In a real app, you'd send this data to the server
        // For demo purposes, we'll just show a success message
        
        alert('Book saved successfully!');
        bookModal.classList.remove('active');
        
        // In a real app, you'd refresh the table data
      });
    }
  }
  
  // Delete book confirmation
  const deleteButtons = document.querySelectorAll('.btn-icon[title="Delete"]');
  const deleteModal = document.getElementById('delete-modal');
  const deleteBookTitle = document.getElementById('delete-book-title');
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  
  if (deleteButtons.length > 0 && deleteModal) {
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        const title = row.querySelector('td:nth-child(2)').textContent.trim();
        
        deleteBookTitle.textContent = title;
        deleteModal.classList.add('active');
        
        // Store reference to the row for deletion
        confirmDeleteBtn.dataset.row = row.rowIndex;
      });
    });
    
    // Confirm deletion
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener('click', function() {
        // In a real app, you'd send a delete request to the server
        // For demo purposes, we'll just remove the row from the table
        
        const rowIndex = this.dataset.row;
        if (rowIndex) {
          const table = document.querySelector('.data-table');
          if (table) {
            table.deleteRow(rowIndex);
          }
        }
        
        deleteModal.classList.remove('active');
        alert('Book deleted successfully!');
      });
    }
  }
  
  // Book request approval/rejection
  const approveButtons = document.querySelectorAll('.btn-success');
  const rejectButtons = document.querySelectorAll('.btn-danger');
  
  if (approveButtons.length > 0) {
    approveButtons.forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        
        // In a real app, you'd send approval to the server
        // For demo purposes, we'll just update the row
        
        row.innerHTML = '<td colspan="5" class="text-center">Request approved successfully!</td>';
        
        // In a real app, you'd refresh the data after a delay
        setTimeout(() => {
          row.remove();
        }, 2000);
      });
    });
  }
  
  if (rejectButtons.length > 0) {
    rejectButtons.forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        
        // In a real app, you'd send rejection to the server
        // For demo purposes, we'll just update the row
        
        row.innerHTML = '<td colspan="5" class="text-center">Request rejected!</td>';
        
        // In a real app, you'd refresh the data after a delay
        setTimeout(() => {
          row.remove();
        }, 2000);
      });
    });
  }
});
function openMemberModal() {
  document.getElementById('memberModal').style.display = 'block';
}

function closeMemberModal() {
  document.getElementById('memberModal').style.display = 'none';
}

function openStudentModal(studNo, name, course, year, section) {
  document.getElementById('studNo').textContent = studNo;
  document.getElementById('studName').textContent = name;
  document.getElementById('studCourse').textContent = course;
  document.getElementById('studYear').textContent = year;
  document.getElementById('studSection').textContent = section;
  document.getElementById('studentModal').style.display = 'block';
}

function closeStudentModal() {
  document.getElementById('studentModal').style.display = 'none';
}
