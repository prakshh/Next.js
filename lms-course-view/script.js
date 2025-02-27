// Select all checkboxes functionality
document.addEventListener('DOMContentLoaded', function() {
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
});