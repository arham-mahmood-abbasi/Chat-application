const dropArea = document.querySelector('.drop-section')
const listSection = document.querySelector('.list-section')
const listContainer = document.querySelector('.list')
const fileSelector = document.querySelector('.file-selector')
const fileSelectorInput = document.querySelector('.file-selector-input')

// UPLOAD FILE WITH BROWSER
fileSelector.onclick = () => fileSelectorInput.click()
fileSelectorInput.onchange = () => {
    [...fileSelectorInput.files].forEach((file) => {
        if(typeValidation(file.type)){
            uploadFile(file)
        }
    })
}

// WHEN THE FILE IS OVER THE DRAG AREA
dropArea.ondragover = (e) => {
    e.preventDefault();
    [...e.dataTransfer.items].forEach((item) => {
        if(typeValidation(item.type)){
            dropArea.classList.add('drag-over-effect')
        }
    })
}
// WHEN FILE LEAVE THE DRAG AREA
dropArea.ondragleave = () => {
    dropArea.classList.remove('drag-over-effect')
}
// WHEN FILE DROP ON THE DRAG AREA
dropArea.ondrop = (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over-effect')
    if(e.dataTransfer.items){
        [...e.dataTransfer.items].forEach((item) => {
            if(item.kind === 'file'){
                const file = item.getAsFile();
                if(typeValidation(file.type)){
                    uploadFile(file)
                }
            }
        })
    }else{
        [...e.dataTransfer.files].forEach((file) => {
            if(typeValidation(file.type)){
                uploadFile(file)
            }
        })
    }
}


// CHECK THE FILE TYPE
function typeValidation(type) {
    // GET THE SECOND PART OF THE MIME TYPE (AFTER '/')
    var splitType = type.split('/')[1];
    if (type === 'application/pdf' ||
        type === 'application/vnd.ms-powerpoint' ||
        type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
        type === 'application/msword' ||
        type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        type === 'application/vnd.ms-excel' ||
        type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        splitType === 'jpeg' ||
        splitType === 'png' ||
        splitType === 'tiff') { 
        return true;
    }
    return false;
}



// UPLOAD FILE FUNCTION
function uploadFile(file) {
    listSection.style.display = 'block';
    var li = document.createElement('li');
    li.classList.add('in-prog');
    li.innerHTML = `
        <div class="col">
            <img src="assets/icons/${iconSelector(file.type)}" alt="">
        </div>
        <div class="col">
            <div class="file-name">
                <div class="name">${file.name}</div>
                <span>0%</span>
            </div>
            <div class="file-progress">
                <span></span>
            </div>
            <div class="file-size">${(file.size / (1024 * 1024)).toFixed(2)} MB</div>
        </div>
        <div class="col">
            <a href='#!'>
                <svg xmlns="http://www.w3.org/2000/svg" class="cross" height="20" width="20"><path d="m5.979 14.917-.854-.896 4-4.021-4-4.062.854-.896 4.042 4.062 4-4.062.854.896-4 4.062 4 4.021-.854.896-4-4.063Z"/></svg>
            </a>
        </div>
    `;
    listContainer.prepend(li);
    var http = new XMLHttpRequest();
    var data = new FormData();
    data.append('file', file);
    http.onload = () => {
        li.classList.add('complete');
        li.classList.remove('in-prog');
    };
    http.upload.onprogress = (e) => {
        var percent_complete = (e.loaded / e.total) * 100;
        li.querySelectorAll('span')[0].innerHTML = Math.round(percent_complete) + '%';
        li.querySelectorAll('span')[1].style.width = percent_complete + '%';
    };
    http.open('POST', 'sender.php', true);
    http.send(data);
    
    // EVENT LISTENER FOR THE CROSS SIGN
    li.querySelector('.cross').parentElement.addEventListener('click', () => {
        http.abort();
        li.remove();
    });
    http.onabort = () => li.remove();
}

// FIND ICONS FOR FILE
function iconSelector(type){
    var splitType = (type.split('/')[0] == 'application') ? type.split('/')[1] : type.split('/')[0];
    return splitType + '.png'
}