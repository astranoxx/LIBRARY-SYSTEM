document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    // Redirect to login page if not logged in
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
  
  // Tab switching on transaction page
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding tab content
        const tabId = `${button.dataset.tab}-tab`;
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
  
  // Profile modal
  const editProfileBtn = document.getElementById('edit-profile');
  const profileModal = document.getElementById('profile-modal');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  const cancelProfileEdit = document.getElementById('cancel-profile-edit');
  
  if (editProfileBtn && profileModal) {
    // Open modal
    editProfileBtn.addEventListener('click', function() {
      profileModal.classList.add('active');
      // Populate fields with user data (would come from server in real app)
      document.getElementById('profile-id').value = currentUser.id;
      document.getElementById('profile-lastname').value = 'Doe';
      document.getElementById('profile-firstname').value = 'John';
      document.getElementById('profile-middlename').value = 'Smith';
      document.getElementById('profile-email').value = 'john.doe@example.com';
    });
    
    // Close modal
    if (closeModalButtons.length > 0) {
      closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
          profileModal.classList.remove('active');
        });
      });
    }
    
    if (cancelProfileEdit) {
      cancelProfileEdit.addEventListener('click', function() {
        profileModal.classList.remove('active');
      });
    }
    
    // Close modal when clicking outside
    profileModal.addEventListener('click', function(e) {
      if (e.target === profileModal) {
        profileModal.classList.remove('active');
      }
    });
  }
  
  // Profile photo upload
  const profilePhoto = document.getElementById('profile-photo');
  const profilePreview = document.getElementById('profile-preview');
  const userProfileImg = document.getElementById('user-profile-img');
  
  if (profilePhoto && profilePreview) {
    profilePhoto.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          profilePreview.src = e.target.result;
          // Also update the header profile image
          if (userProfileImg) {
            userProfileImg.src = e.target.result;
          }
        };
        
        reader.readAsDataURL(file);
      }
    });
  }
  
  // Save profile changes
  const saveProfileBtn = document.getElementById('save-profile');
  
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', function() {
      const lastName = document.getElementById('profile-lastname').value;
      const firstName = document.getElementById('profile-firstname').value;
      const middleName = document.getElementById('profile-middlename').value;
      const email = document.getElementById('profile-email').value;
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
      
      // In a real app, you would send this data to the server
      // For demo purposes, we'll just show a success message
      
      alert('Profile updated successfully!');
      profileModal.classList.remove('active');
      
      // Update displayed name
      const updatedName = `${firstName} ${lastName}`;
      userNameElements.forEach(element => {
        element.textContent = updatedName;
      });
      
      // Update user object in localStorage
      currentUser.name = updatedName;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    });
  }
  
  // Transaction detail modal
  const detailButtons = document.querySelectorAll('.btn-icon[title="View Details"]');
  const transactionModal = document.getElementById('transaction-modal');
  const transactionDetails = document.querySelector('.transaction-details');
  
  if (detailButtons.length > 0 && transactionModal && transactionDetails) {
    detailButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Get transaction details from the row (in a real app, you'd fetch this from the server)
        const row = this.closest('tr');
        const type = row.querySelector('td:nth-child(1)').textContent.trim();
        const title = row.querySelector('td:nth-child(2)').textContent.trim();
        const date = row.querySelector('td:nth-child(3)').textContent.trim();
        let dueDate = '';
        let status = '';
        let fine = '';
        
        // Different table structures might have different column indexes
        try {
          dueDate = row.querySelector('td:nth-child(4)').textContent.trim();
          status = row.querySelector('td:nth-child(5) .status-badge').textContent.trim();
          fine = row.querySelector('td:nth-child(6)').textContent.trim();
        } catch (e) {
          // Handle case where columns might be different
          console.log('Column structure differs');
        }
        
        // Populate modal with transaction details
        transactionDetails.innerHTML = `
          <div class="detail-item">
            <strong>Type:</strong> ${type}
          </div>
          <div class="detail-item">
            <strong>Title/Room:</strong> ${title}
          </div>
          <div class="detail-item">
            <strong>Date:</strong> ${date}
          </div>
          ${dueDate ? `<div class="detail-item"><strong>Due Date:</strong> ${dueDate}</div>` : ''}
          ${status ? `<div class="detail-item"><strong>Status:</strong> ${status}</div>` : ''}
          ${fine && fine !== '-' ? `<div class="detail-item"><strong>Fine:</strong> ${fine}</div>` : ''}
          <div class="detail-item">
            <strong>Additional Information:</strong>
            <p>Transaction processed by Librarian ID: LIB-2023-001</p>
          </div>
        `;
        
        // Show modal
        transactionModal.classList.add('active');
      });
    });
    
    // Close transaction modal
    const closeTransactionModal = transactionModal.querySelector('.close-modal');
    if (closeTransactionModal) {
      closeTransactionModal.addEventListener('click', function() {
        transactionModal.classList.remove('active');
      });
    }
    
    // Close modal when clicking outside
    transactionModal.addEventListener('click', function(e) {
      if (e.target === transactionModal) {
        transactionModal.classList.remove('active');
      }
    });
  }
  
  // Member list modal (for room reservations)
  const editButtons = document.querySelectorAll('.btn-icon[title="Edit"]');
  const memberListModal = document.getElementById('member-list-modal');
  const addMemberBtn = document.getElementById('add-member');
  const memberListBody = document.getElementById('member-list-body');
  const memberNameInput = document.getElementById('member-name');
  const memberIdInput = document.getElementById('member-id');
  
  if (editButtons.length > 0 && memberListModal) {
    editButtons.forEach(button => {
      button.addEventListener('click', function() {
        // In a real app, you'd fetch the member list from the server
        // For demo purposes, we'll just show the modal with some example data
        if (memberListBody) {
          memberListBody.innerHTML = `
            <tr>
              <td>John Doe</td>
              <td>2023-0001</td>
              <td>
                <button class="btn-icon" title="Remove Member"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>2023-0042</td>
              <td>
                <button class="btn-icon" title="Remove Member"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          `;
          
          // Add event listeners to remove buttons
          const removeButtons = memberListBody.querySelectorAll('.btn-icon[title="Remove Member"]');
          removeButtons.forEach(removeBtn => {
            removeBtn.addEventListener('click', function() {
              this.closest('tr').remove();
            });
          });
        }
        
        // Show modal
        memberListModal.classList.add('active');
      });
    });
    
    // Add member to list
    if (addMemberBtn && memberListBody && memberNameInput && memberIdInput) {
      addMemberBtn.addEventListener('click', function() {
        const name = memberNameInput.value.trim();
        const id = memberIdInput.value.trim();
        
        if (!name || !id) {
          alert('Please enter both name and ID.');
          return;
        }
        
        // Add member to list
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${name}</td>
          <td>${id}</td>
          <td>
            <button class="btn-icon" title="Remove Member"><i class="fas fa-trash"></i></button>
          </td>
        `;
        
        // Add event listener to remove button
        const removeButton = newRow.querySelector('.btn-icon');
        removeButton.addEventListener('click', function() {
          newRow.remove();
        });
        
        memberListBody.appendChild(newRow);
        
        // Clear inputs
        memberNameInput.value = '';
        memberIdInput.value = '';
      });
    }
    
    // Close member list modal
    const closeMemberListModal = memberListModal.querySelector('.close-modal');
    if (closeMemberListModal) {
      closeMemberListModal.addEventListener('click', function() {
        memberListModal.classList.remove('active');
      });
    }
    
    // Close modal when clicking outside
    memberListModal.addEventListener('click', function(e) {
      if (e.target === memberListModal) {
        memberListModal.classList.remove('active');
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // Category Filter Function
  const categoryButtons = document.querySelectorAll(".category-btn");
  const bookCards = document.querySelectorAll(".book-card");

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and add to the clicked one
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter books based on selected category
      const selectedCategory = button.dataset.category;
      bookCards.forEach(card => {
        const bookLocation = card.querySelector(".book-location").textContent.toLowerCase();
        if (selectedCategory === "all" || bookLocation.includes(selectedCategory)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Pagination Function
  const paginationButtons = document.querySelectorAll(".pagination-btn");
  const itemsPerPage = 3;
  let currentPage = 1;

  function paginate(page) {
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    bookCards.forEach((card, index) => {
      if (index >= start && index < end) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    paginationButtons.forEach((btn, index) => {
      btn.classList.toggle("active", index + 1 === page);
    });
  }

  paginationButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      paginate(index + 1);
    });
  });

  paginate(currentPage); // Initial pagination on load

  // Request Book Functionality
  const requestButtons = document.querySelectorAll(".btn-primary");
  const modal = document.getElementById("request-modal");
  const modalCover = document.getElementById("modal-book-cover");
  const modalTitle = document.getElementById("modal-book-title");
  const modalAuthor = document.getElementById("modal-book-author");
  const modalType = document.getElementById("modal-book-type");
  const closeModalButtons = document.querySelectorAll(".close-modal");
  const confirmRequestButton = document.getElementById("confirm-request");
  const emailContainer = document.getElementById("email-container");
  const pickupDateContainer = document.getElementById("pickup-date-container");

  requestButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const bookCard = event.target.closest(".book-card");
      const coverSrc = bookCard.querySelector(".book-cover img").src;
      const title = bookCard.querySelector("h3").textContent;
      const author = bookCard.querySelector(".book-author").textContent;
      const bookType = button.dataset.bookType;

      // Populate modal with book info
      modalCover.src = coverSrc;
      modalTitle.textContent = title;
      modalAuthor.textContent = author;
      modalType.textContent = bookType === "ebook" ? "E-Book" : "Physical Book";

      // Show/hide fields based on book type
      if (bookType === "ebook") {
        emailContainer.style.display = "block";
        pickupDateContainer.style.display = "none";
        modalType.classList.add("ebook-label");
      } else {
        emailContainer.style.display = "none";
        pickupDateContainer.style.display = "block";
        modalType.classList.remove("ebook-label");
      }

      // Reset form
      document.getElementById("pickup-date").value = "";
      document.getElementById("request-notes").value = "";
      document.getElementById("terms-agreement").checked = false;
      confirmRequestButton.disabled = true;

      // Show modal
      modal.style.display = "block";
    });
  });

  // Close modal
  closeModalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  });

  // Confirm book request
  confirmRequestButton.addEventListener("click", () => {
    const bookType = modalType.textContent.toLowerCase();
    const pickupDate = document.getElementById("pickup-date").value;
    const requestNotes = document.getElementById("request-notes").value;
    const email = document.getElementById("email-confirm").value;

    if (bookType === "physical book" && !pickupDate) {
      alert("Please select a preferred pickup date.");
      return;
    }

    let successMessage = "";
    if (bookType === "ebook") {
      successMessage = `E-book request submitted successfully!\nDownload link will be sent to: ${email}`;
    } else {
      successMessage = `Book request submitted successfully!\nPickup Date: ${pickupDate}`;
    }
    if (requestNotes) {
      successMessage += `\nNotes: ${requestNotes}`;
    }

    alert(successMessage);
    modal.style.display = "none";
  });

  // Close modal when clicking outside the content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Search and Filter Functionality
const searchInput = document.querySelector('.search-container input');
const locationButtons = document.querySelectorAll('.location-btn');
const bookCards = document.querySelectorAll('.book-card');

// Search functionality
if (searchInput) {
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    filterBooks();
  });
}

// Location filter functionality
if (locationButtons.length > 0) {
  locationButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all location buttons
      locationButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      filterBooks();
    });
  });
}

// Combined filter function
function filterBooks() {
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedLocation = document.querySelector('.location-btn.active').dataset.location;

  bookCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const author = card.querySelector('.book-author').textContent.toLowerCase();
    const location = card.dataset.location;
    const category = card.dataset.category;

    // Check if book matches search term
    const matchesSearch = searchTerm === '' || 
      title.includes(searchTerm) || 
      author.includes(searchTerm);

    // Check if book matches location filter
    const matchesLocation = selectedLocation === 'all' || location === selectedLocation;

    // Show/hide card based on filters
    if (matchesSearch && matchesLocation) {
      card.style.display = 'block';
      // Add animation
      card.style.animation = 'fadeIn 0.3s ease-in-out';
    } else {
      card.style.display = 'none';
    }
  });

  // Update pagination after filtering
  updatePagination();
}

// Update pagination based on visible cards
function updatePagination() {
  const visibleCards = Array.from(bookCards).filter(card => card.style.display !== 'none');
  const itemsPerPage = 6; // Adjust this number based on your grid layout
  const totalPages = Math.ceil(visibleCards.length / itemsPerPage);
  
  // Update pagination buttons
  const paginationContainer = document.querySelector('.pagination');
  if (paginationContainer) {
    let paginationHTML = `
      <button class="pagination-btn" data-page="prev"><i class="fas fa-chevron-left"></i></button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `
        <button class="pagination-btn ${i === 1 ? 'active' : ''}" data-page="${i}">${i}</button>
      `;
    }

    paginationHTML += `
      <button class="pagination-btn" data-page="next"><i class="fas fa-chevron-right"></i></button>
    `;

    paginationContainer.innerHTML = paginationHTML;

    // Add event listeners to new pagination buttons
    const paginationButtons = paginationContainer.querySelectorAll('.pagination-btn');
    paginationButtons.forEach(button => {
      button.addEventListener('click', function() {
        const page = this.dataset.page;
        if (page === 'prev') {
          const currentPage = parseInt(document.querySelector('.pagination-btn.active').dataset.page);
          if (currentPage > 1) {
            showPage(currentPage - 1);
          }
        } else if (page === 'next') {
          const currentPage = parseInt(document.querySelector('.pagination-btn.active').dataset.page);
          if (currentPage < totalPages) {
            showPage(currentPage + 1);
          }
        } else {
          showPage(parseInt(page));
        }
      });
    });
  }

  // Show first page by default
  showPage(1);
}

// Show specific page of results
function showPage(page) {
  const visibleCards = Array.from(bookCards).filter(card => card.style.display !== 'none');
  const itemsPerPage = 6;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  // Hide all cards first
  bookCards.forEach(card => {
    if (card.style.display !== 'none') {
      card.style.display = 'none';
    }
  });

  // Show cards for current page
  visibleCards.slice(start, end).forEach(card => {
    card.style.display = 'block';
    card.style.animation = 'fadeIn 0.3s ease-in-out';
  });

  // Update active pagination button
  const paginationButtons = document.querySelectorAll('.pagination-btn');
  paginationButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.page === page.toString()) {
      btn.classList.add('active');
    }
  });
}

// Initial filter
filterBooks();

