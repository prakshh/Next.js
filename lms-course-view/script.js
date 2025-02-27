// Select all checkboxes functionality
document.addEventListener('DOMContentLoaded', function() {
  // Navigation functionality
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  const pages = document.querySelectorAll('.page-content');
  
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
  
  // Form Preview functionality
  const previewFormBtn = document.querySelector('.preview-form-btn');
  const saveFormBtn = document.querySelector('.save-form-btn');
  const formPreview = document.getElementById('form-preview');
  const closePreviewBtn = document.querySelector('.close-preview-btn');
  
  if (previewFormBtn) {
    previewFormBtn.addEventListener('click', function() {
      formPreview.style.display = 'block';
      // Set current date for hidden timestamp field
      document.getElementById('submission-date').value = new Date().toISOString();
    });
  }
  
  if (closePreviewBtn) {
    closePreviewBtn.addEventListener('click', function() {
      formPreview.style.display = 'none';
    });
  }
  
  if (saveFormBtn) {
    saveFormBtn.addEventListener('click', function() {
      alert('Form configuration saved successfully!');
    });
  }
  
  // Tags/Chips functionality
  const tagsInput = document.getElementById('tags');
  const chipsContainer = document.querySelector('.chips-container');
  
  if (tagsInput) {
    tagsInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const tagValue = this.value.trim();
        
        if (tagValue) {
          // Create a new chip
          const chip = document.createElement('div');
          chip.className = 'chip';
          chip.innerHTML = `
            ${tagValue}
            <i class="fas fa-times"></i>
          `;
          
          // Add delete functionality to chip
          chip.querySelector('i').addEventListener('click', function() {
            chip.remove();
          });
          
          chipsContainer.appendChild(chip);
          this.value = '';
        }
      }
    });
  }
  
  // Form submission
  const sampleForm = document.getElementById('sample-form');
  if (sampleForm) {
    sampleForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Form submitted successfully!');
      formPreview.style.display = 'none';
    });
  }
  
  // Cancel button
  const cancelBtn = document.querySelector('.cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      formPreview.style.display = 'none';
    });
  }
});