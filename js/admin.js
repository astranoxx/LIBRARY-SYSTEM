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
        const selectedTab = document.getElementById(tabId);
        selectedTab.classList.add('active');

        // Update search functionality based on active tab
        const searchInput = document.querySelector('.search-container input');
        if (searchInput) {
          searchInput.value = ''; // Clear search when switching tabs
          const allRows = document.querySelectorAll('.data-table tbody tr');
          allRows.forEach(row => row.style.display = '');
        }
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

  // Search functionality for book requests
  const bookSearchInput = document.querySelector('.card:first-of-type .search-container input');
  const bookSearchButton = document.querySelector('.card:first-of-type .search-container button');

  if (bookSearchInput && bookSearchButton) {
    function performBookSearch() {
      const searchTerm = bookSearchInput.value.toLowerCase().trim();
      const bookTable = document.querySelector('.card:first-of-type .data-table');
      
      if (bookTable) {
        const rows = bookTable.querySelectorAll('tbody tr');
        rows.forEach(row => {
          const memberName = row.cells[0].textContent.toLowerCase();
          const idNumber = row.cells[1].textContent.toLowerCase();
          const bookTitle = row.cells[2].textContent.toLowerCase();
          
          const isVisible = memberName.includes(searchTerm) || 
                          idNumber.includes(searchTerm) || 
                          bookTitle.includes(searchTerm);
          
          row.style.display = isVisible ? '' : 'none';
        });
      }
    }

    bookSearchButton.addEventListener('click', performBookSearch);
    bookSearchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performBookSearch();
      }
    });

    bookSearchInput.addEventListener('input', function() {
      if (this.value.trim() === '') {
        const rows = document.querySelector('.card:first-of-type .data-table tbody tr');
        rows.forEach(row => row.style.display = '');
      }
    });
  }

  // Search functionality for room requests
  const roomSearchInput = document.querySelector('.card:nth-of-type(2) .search-container input');
  const roomSearchButton = document.querySelector('.card:nth-of-type(2) .search-container button');

  if (roomSearchInput && roomSearchButton) {
    function performRoomSearch() {
      const searchTerm = roomSearchInput.value.toLowerCase().trim();
      const roomTable = document.querySelector('.card:nth-of-type(2) .data-table');
      
      if (roomTable) {
        const rows = roomTable.querySelectorAll('tbody tr');
        rows.forEach(row => {
          const memberName = row.cells[0].textContent.toLowerCase();
          const idNumber = row.cells[1].textContent.toLowerCase();
          const roomName = row.cells[2].textContent.toLowerCase();
          const purpose = row.cells[5].textContent.toLowerCase();
          
          const isVisible = memberName.includes(searchTerm) || 
                          idNumber.includes(searchTerm) || 
                          roomName.includes(searchTerm) ||
                          purpose.includes(searchTerm);
          
          row.style.display = isVisible ? '' : 'none';
        });
      }
    }

    roomSearchButton.addEventListener('click', performRoomSearch);
    roomSearchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performRoomSearch();
      }
    });

    roomSearchInput.addEventListener('input', function() {
      if (this.value.trim() === '') {
        const rows = document.querySelector('.card:nth-of-type(2) .data-table tbody tr');
        rows.forEach(row => row.style.display = '');
      }
    });
  }

  // Filter buttons functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const bookTable = document.querySelector('.book-table');
  const roomTable = document.querySelector('.room-table');

  if (filterButtons.length > 0 && bookTable && roomTable) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get the filter value
        const filterValue = this.dataset.filter;
        
        // Show/hide tables based on filter
        if (filterValue === 'all') {
          bookTable.style.display = '';
          roomTable.style.display = '';
        } else if (filterValue === 'book') {
          bookTable.style.display = '';
          roomTable.style.display = 'none';
        } else if (filterValue === 'room') {
          bookTable.style.display = 'none';
          roomTable.style.display = '';
        }
      });
    });
  }

  // Request handling functionality
  function handleRequest(type, action, row) {
    const cells = row.cells;
    const memberName = cells[0].textContent;
    let confirmationMessage = '';
    let activityMessage = '';

    if (type === 'book') {
      const bookTitle = cells[2].textContent;
      confirmationMessage = `Are you sure you want to ${action} ${memberName}'s request for "${bookTitle}"?`;
      activityMessage = `${memberName}'s book request for "${bookTitle}" was ${action}ed`;
    } else {
      const roomName = cells[2].textContent;
      const date = cells[3].textContent;
      const time = cells[4].textContent;
      confirmationMessage = `Are you sure you want to ${action} ${memberName}'s request for ${roomName} on ${date} at ${time}?`;
      activityMessage = `${memberName}'s room request for ${roomName} was ${action}ed`;
    }

    if (confirm(confirmationMessage)) {
      const statusClass = action === 'approve' ? 'approved' : 'rejected';
      const colspan = type === 'book' ? 5 : 7;
      
      row.innerHTML = `
        <td colspan="${colspan}" class="text-center">
          <span class="status-badge ${statusClass}">Request ${action}d</span>
        </td>
      `;
      
      addToRecentActivity(activityMessage);
      setTimeout(() => row.remove(), 2000);
    }
  }

  // Add event listeners for approve/reject buttons
  document.querySelectorAll('.btn-success, .btn-danger').forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const isBookRequest = row.closest('.book-table') !== null;
      const action = this.classList.contains('btn-success') ? 'approve' : 'reject';
      handleRequest(isBookRequest ? 'book' : 'room', action, row);
    });
  });

  // Function to add items to recent activity
  function addToRecentActivity(activityText) {
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
      const activityItem = document.createElement('div');
      activityItem.className = 'activity-item';
      activityItem.innerHTML = `
        <div class="activity-icon">
          <i class="fas fa-clipboard-check"></i>
        </div>
        <div class="activity-details">
          <p>${activityText}</p>
          <span class="activity-time">Just now</span>
        </div>
      `;
      
      activityList.insertBefore(activityItem, activityList.firstChild);
      
      const activities = activityList.querySelectorAll('.activity-item');
      if (activities.length > 5) {
        activities[activities.length - 1].remove();
      }
    }
  }

  // Profile modal
  const editProfileBtn = document.getElementById('edit-profile');
  const profileModal = document.getElementById('profile-modal');
  const profileCloseButtons = document.querySelectorAll('#profile-modal .close-modal');
  const cancelProfileEdit = document.getElementById('cancel-profile-edit');
  const saveProfileBtn = document.getElementById('save-profile');
  const profilePhoto = document.getElementById('profile-photo');
  const profilePreview = document.getElementById('profile-preview');
  const userProfileImg = document.getElementById('user-profile-img');

  if (editProfileBtn && profileModal) {
    // Open modal
    editProfileBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Edit profile button clicked');
      
      // Get current user data from localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        console.error('No user data found in localStorage');
        return;
      }
      
      // Populate modal with user data
      document.getElementById('profile-id').value = currentUser.id || '';
      document.getElementById('profile-lastname').value = currentUser.lastName || '';
      document.getElementById('profile-firstname').value = currentUser.firstName || '';
      document.getElementById('profile-middlename').value = currentUser.middleName || '';
      document.getElementById('profile-email').value = currentUser.email || '';
      
      // Set profile image if exists
      if (currentUser.profileImage) {
        profilePreview.src = currentUser.profileImage;
      }
      
      // Show modal
      profileModal.classList.add('active');
    });
    
    // Close modal
    function closeProfileModal() {
      profileModal.classList.remove('active');
      // Clear password fields
      document.getElementById('profile-current-password').value = '';
      document.getElementById('profile-new-password').value = '';
    }
    
    if (profileCloseButtons.length > 0) {
      profileCloseButtons.forEach(button => {
        button.addEventListener('click', closeProfileModal);
      });
    }
    
    if (cancelProfileEdit) {
      cancelProfileEdit.addEventListener('click', closeProfileModal);
    }
    
    // Close modal when clicking outside
    profileModal.addEventListener('click', function(e) {
      if (e.target === profileModal) {
        closeProfileModal();
      }
    });
  }

  // Profile photo upload
  if (profilePhoto && profilePreview) {
    profilePhoto.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          const imageData = e.target.result;
          profilePreview.src = imageData;
          // Also update the header profile image
          if (userProfileImg) {
            userProfileImg.src = imageData;
          }
          
          // Update user data in localStorage
          const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
          currentUser.profileImage = imageData;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        };
        
        reader.readAsDataURL(file);
      }
    });
  }

  // Save profile changes
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', function() {
      const lastName = document.getElementById('profile-lastname').value.trim();
      const firstName = document.getElementById('profile-firstname').value.trim();
      const middleName = document.getElementById('profile-middlename').value.trim();
      const email = document.getElementById('profile-email').value.trim();
      const currentPassword = document.getElementById('profile-current-password').value;
      const newPassword = document.getElementById('profile-new-password').value;
      
      // Simple validation
      if (!lastName || !firstName || !email || !currentPassword) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Get current user data
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
      
      // Update user data
      currentUser.lastName = lastName;
      currentUser.firstName = firstName;
      currentUser.middleName = middleName;
      currentUser.email = email;
      currentUser.name = `${firstName} ${lastName}`; // Update display name
      
      // Save updated user data
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      // Update displayed name
      const userNameElements = document.querySelectorAll('#user-name');
      userNameElements.forEach(element => {
        element.textContent = currentUser.name;
      });
      
      // Show success message
      alert('Profile updated successfully!');
      
      // Close modal
      profileModal.classList.remove('active');
      
      // Clear password fields
      document.getElementById('profile-current-password').value = '';
      document.getElementById('profile-new-password').value = '';
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
