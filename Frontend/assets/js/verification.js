document.addEventListener('DOMContentLoaded', ()=>{
    const qrCodeDiv = document.querySelector('.qrImage-div');
    if(qrCodeDiv){
        let image = document.createElement('img');
        image.src = localStorage.getItem('qrImagePath');
        qrCodeDiv.appendChild(image);
    }
});

// Get the error toast element and its body
const errorToast = document.getElementById('errorToast');
const toastBody = errorToast.querySelector('.toast-body');

function showErrorToast(message) {
    toastBody.textContent = message;
    const errorToastInstance = new bootstrap.Toast(errorToast);
    errorToastInstance.show();
}

const verifyToken = async () => {
    const tokenKey = document.querySelector('#verification-code').value.trim();
    if (!tokenKey) {
        showErrorToast("Please enter a verification code.");
        return;
    }
    try {
        // Set token in request headers
        const token = localStorage.getItem('userToken');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.post('http://localhost:3005/api/user/verify',
        {
            secretKey: localStorage.getItem('qrSecret'),
            tokenKey: tokenKey
        }, 
        config
    );
        // Handle response as needed
        if(response.status === 201){
            localStorage.removeItem('qrSecret');
            localStorage.removeItem('qrImagePath');
            window.location.href = 'index.html';
        }
    } catch (error) {
        // Extract meaningful error message
        let errorMessage = "An error occurred";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
        showErrorToast(errorMessage);
    }
};

let verifyBtn = document.querySelector('.verify-btn');
if (verifyBtn) {
    verifyBtn.addEventListener("click", verifyToken);
}
