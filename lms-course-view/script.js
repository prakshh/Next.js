// Select all checkboxes functionality
document.addEventListener('DOMContentLoaded', function() {
  // Navigation functionality
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  const pages = document.querySelectorAll('.page-content');

  // Auto-select the first available course
  const courseDropdown = document.getElementById("course-name");
  if (courseDropdown && courseDropdown.options.length > 1) {
    courseDropdown.selectedIndex = 1; // Select the first course option
  }

  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the page id from data attribute
      const pageId = this.getAttribute('data-page');
      
      // Remove active class from all links and add to clicked link
      navLinks.forEach(navLink => {
        navLink.parentElement.classList.remove('active');
      });
      this.parentElement.classList.add('active');
      
      // Hide all pages and show the selected one
      pages.forEach(page => {
        page.classList.remove('active-page');
      });
      
      document.getElementById(pageId + '-page')?.classList.add('active-page');
    });
  });
  
  // Checkbox functionality
  const selectAllCheckbox = document.getElementById('select-all');
  const rowCheckboxes = document.querySelectorAll('.row-checkbox');
  
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      const isChecked = this.checked;
      rowCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
      });
    });
  }
  
  // Individual checkbox change event
  rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      // Check if all checkboxes are checked
      const allChecked = [...rowCheckboxes].every(cb => cb.checked);
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = allChecked;
      }
    });
  });
  
  // Add event listeners for buttons
  const editButtons = document.querySelectorAll('.edit-btn');
  const deleteButtons = document.querySelectorAll('.delete-btn');
  
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const subject = row.querySelector('td:nth-child(2)').textContent;
      alert(`Editing ${subject} course`);
    });
  });
  
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const subject = row.querySelector('td:nth-child(2)').textContent;
      if (confirm(`Are you sure you want to delete ${subject} course?`)) {
        row.remove();
      }
    });
  });
  
  // Add Course button
  const addCourseBtn = document.querySelector('.add-course-btn');
  if (addCourseBtn) {
    addCourseBtn.addEventListener('click', function() {
      alert('Add new course functionality would open here');
    });
  }
  
  // Dropdown functionality
  const dropdownBtns = document.querySelectorAll('.dropdown-btn');
  dropdownBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      alert(`Dropdown for ${this.textContent.trim()} would open here`);
    });
  });
  
  // Tags/Chips functionality
  const tagsInput = document.getElementById('tags');
  const chipsContainer = document.querySelector('.chips-container');
  
  if (tagsInput) {
    tagsInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const tagValue = this.value.trim();
        
        if (tagValue) {
          addChip(tagValue);
          this.value = '';
        }
      }
    });
    
    // Also add chip when input loses focus
    tagsInput.addEventListener('blur', function() {
      const tagValue = this.value.trim();
      if (tagValue) {
        addChip(tagValue);
        this.value = '';
      }
    });
  }
  
  function addChip(value) {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.innerHTML = `
      ${value}
      <i class="fas fa-times"></i>
    `;
    
    // Add delete functionality to chip
    chip.querySelector('i').addEventListener('click', function() {
      chip.remove();
    });
    
    chipsContainer.appendChild(chip);
  }
  
  // File upload functionality
  const fileInput = document.getElementById('attachments');
  const fileNames = document.querySelector('.file-names');
  
  if (fileInput) {
    fileInput.addEventListener('change', function() {
      fileNames.innerHTML = '';
      
      if (this.files.length > 0) {
        Array.from(this.files).forEach(file => {
          const fileItem = document.createElement('div');
          fileItem.className = 'file-item';
          fileItem.innerHTML = `
            <span><i class="fas fa-file"></i> ${file.name}</span>
            <i class="fas fa-times remove-file"></i>
          `;
          
          fileItem.querySelector('.remove-file').addEventListener('click', function() {
            fileItem.remove();
            // Note: Can't actually remove from FileList, this just hides it from UI
          });
          
          fileNames.appendChild(fileItem);
        });
      }
    });
  }
  
  // Form submission
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Set current date for hidden timestamp field
      document.getElementById('submission-date').value = new Date().toISOString();
      
      // Collect form data
      const formData = new FormData(this);
      
      // Get all chips and add them to form data
      const chips = document.querySelectorAll('.chip');
      const tags = Array.from(chips).map(chip => chip.textContent.trim());
      
      // For demo purposes, just show an alert
      alert('Form submitted successfully!');
      
      // In a real application, you would send the form data to a server
      console.log('Form submitted with data:', Object.fromEntries(formData));
      console.log('Tags:', tags);
    });
  }
  
  // Cancel button
  const cancelBtn = document.querySelector('.cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
        feedbackForm.reset();
        document.querySelector('.chips-container').innerHTML = '';
        document.querySelector('.file-names').innerHTML = '';
      }
    });
  }
  
  // Add some sample chips for demonstration
  if (chipsContainer) {
    ['feedback', 'important'].forEach(tag => addChip(tag));
  }
});