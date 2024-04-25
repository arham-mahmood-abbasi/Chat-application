const customSelect = document.querySelector(".custom-select");
if(customSelect){
  const selectBtn = document.querySelector(".select-button");
  const selectedValue = document.querySelector(".selected-value");
  const optionsList = document.querySelectorAll(".select-dropdown li");

  // add click event to select button
  selectBtn.addEventListener("click", () => {
    // add/remove active class on the container element
    customSelect.classList.toggle("active");
    // update the aria-expanded attribute based on the current state
    selectBtn.setAttribute(
      "aria-expanded",
      selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
  });

  optionsList.forEach((option) => {
    function handler(e) {
      // Click Events
      if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
        selectedValue.textContent = this.children[1].textContent;
        customSelect.classList.remove("active");
      }
      // Key Events
      if (e.key === "Enter") {
        selectedValue.textContent = this.textContent;
        customSelect.classList.remove("active");
      }
    }

    option.addEventListener("keyup", handler);
    option.addEventListener("click", handler);
  });
}

const editor = document.getElementById('editor');
if(editor){
  const boldBtn = document.getElementById('bold');
  const italicBtn = document.getElementById('italic');
  const underlineBtn = document.getElementById('underline');
  const removeFormatBtn = document.getElementById('remove-format');
  const bulletListBtn = document.getElementById('bullet-list');

  boldBtn.addEventListener('click', function() {
  document.execCommand('bold');
  boldBtn.classList.toggle('active');
  });

  italicBtn.addEventListener('click', function() {
  document.execCommand('italic');
  italicBtn.classList.toggle('active');
  });

  underlineBtn.addEventListener('click', function() {
  document.execCommand('underline');
  underlineBtn.classList.toggle('active');
  });

  removeFormatBtn.addEventListener('click', function() {
  document.execCommand('removeFormat');
  removeFormatBtn.classList.toggle('active');
  });

  bulletListBtn.addEventListener('click', function() {
  document.execCommand('InsertUnorderedList');
  bulletListBtn.classList.toggle('active');
  });
}

const dropzone = document.querySelector('.dropzone');
if(dropzone){
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

// Highlight on drag over
dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('drag-over');
});

// Remove highlight on drag leave/end
['dragleave', 'dragend'].forEach(eventName => {
  dropzone.addEventListener(eventName, () => {
    dropzone.classList.remove('drag-over');
  });
});

// Handle dropped files
dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('drag-over');
  const files = e.dataTransfer.files;

  // Clear existing list items
  fileList.innerHTML = '';

  // Add list items for each dropped file
  for (const file of files) {
    const listItem = document.createElement('li');
    listItem.textContent = file.name;
    fileList.appendChild(listItem);
  }
});

// Open file selection dialog on click
dropzone.addEventListener('click', () => {
  fileInput.click();
});

// Handle file selection from dialog
fileInput.addEventListener('change', (e) => {
  const files = e.target.files;

  // Clear existing list items
  fileList.innerHTML = '';

  // Add list items for each selected file
  for (const file of files) {
    const listItem = document.createElement('li');
    listItem.textContent = file.name;
    fileList.appendChild(listItem);
  }
});


}


function validatePoints(inputField) {
  const value = inputField.value;
  if (!/^\d+$/.test(value)) {
    inputField.value = "";
  } else if (value > 100) {
    inputField.value = 100;
  }
}
