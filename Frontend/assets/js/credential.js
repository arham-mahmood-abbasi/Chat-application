// Get the error toast element and its body
const errorToast = document.getElementById('errorToast');
const toastBody = errorToast.querySelector('.toast-body');
//Register button for user registration



const inputList = [
    document.querySelector('#username'),
    document.querySelector('#email-address'),
    document.querySelector('#password'),
    document.querySelector('#repeat-password')
];


// Function to clear the text in a list of input elements
function clearInputs(inputList) {
    inputList.forEach(element => {
        if (element instanceof HTMLInputElement) {
            element.value = '';
        } else {
            console.error('Invalid input element found in the list.');
        }
    });
}

// Function to validate registration form inputs
function registerValidator() {
    const personName = document.querySelector('#username').value.trim();
    const userEmail = document.querySelector('#email-address').value.trim();
    const password = document.querySelector('#password').value.trim();
    const rePassword = document.querySelector('#repeat-password').value.trim();

    // Check if inputs are empty
    if (!personName) {
        showErrorToast("Please enter your name.");
        clearInputs([document.querySelector('#username')])
        return;
    }
    if (!userEmail) {
        showErrorToast("Please enter your email address.");
        clearInputs([document.querySelector('#email-address')])
        return;
    }
    if (!password) {
        showErrorToast("Please enter a password.");
        clearInputs([document.querySelector('#password'), document.querySelector('#repeat-password')])
        return;
    }
    if (!rePassword) {
        showErrorToast("Please repeat your password.");
        clearInputs([document.querySelector('#password'), document.querySelector('#repeat-password')])
        return;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        showErrorToast("Please enter a valid email address.");
        clearInputs([document.querySelector('#email-address')])
        return;
    }

    // Check password length
    if (password.length < 8) {
        showErrorToast("Password should be at least 8 characters long.");
        clearInputs([document.querySelector('#password'), document.querySelector('#repeat-password')])
        return;
    }

    // Check if passwords match
    if (password !== rePassword) {
        showErrorToast("Passwords do not match.");
        clearInputs([document.querySelector('#password'), document.querySelector('#repeat-password')])
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\;:'",.<>?]).{8,}$/;
    if (!passwordRegex.test(password)) {
        showErrorToast("Password should contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.");
        return;
    }

    clearInputs(inputList)
    // If all validations pass, return user data
    return {
        name: personName,
        email: userEmail,
        password: password
    };
}

// Function to validate registration form inputs
function loginValidator() {
    const userEmail = document.querySelector('#email-address').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (!userEmail) {
        showErrorToast("Please enter your email address.");
        clearInputs([document.querySelector('#email-address')])
        return;
    }
    if (!password) {
        showErrorToast("Please enter a password.");
        clearInputs([document.querySelector('#password'), document.querySelector('#repeat-password')])
        return;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        showErrorToast("Please enter a valid email address.");
        clearInputs([document.querySelector('#email-address')])
        return;
    }

    // Check password length
    if (password.length < 8) {
        showErrorToast("Password should be at least 8 characters long.");
        clearInputs([document.querySelector('#password'), document.querySelector('#repeat-password')])
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\;:'",.<>?]).{8,}$/;
    if (!passwordRegex.test(password)) {
        showErrorToast("Password should contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.");
        return;
    }

    // If all validations pass, return user data
    return {
        username: userEmail,
        password: password
    };
}

function validValidator() {
    const userEmail = document.querySelector('#email-address').value.trim();

    if (!userEmail) {
        showErrorToast("Please enter your email address.");
        clearInputs([document.querySelector('#email-address')])
        return;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        showErrorToast("Please enter a valid email address.");
        clearInputs([document.querySelector('#email-address')])
        return;
    }

    return {
        username: userEmail
    };
}
function forgotValidator() {
    const password = document.querySelector('#password').value.trim();
    const rePassword = document.querySelector('#repeat-password').value.trim();
    if (!password) {
        showErrorToast("Please enter a password.");
        clearInputs([document.querySelector('#password'), document.querySelector('#repeat-password')])
        return;
    }
    if (!rePassword) {
        showErrorToast("Please repeat your password.");
        clearInputs([document.querySelector('#password'), document.querySelector('#repeat-password')])
        return;
    }


    // Check password length
    if (password.length < 8) {
        showErrorToast("Password should be at least 8 characters long.");
        clearInputs([document.querySelector('#password'), document.querySelector('#repeat-password')])
        return;
    }

    // Check if passwords match
    if (password !== rePassword) {
        showErrorToast("Passwords do not match.");
        clearInputs([document.querySelector('#password'), document.querySelector('#repeat-password')])
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\;:'",.<>?]).{8,}$/;
    if (!passwordRegex.test(password)) {
        showErrorToast("Password should contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.");
        return;
    }

    return {
        password: password
    };
}

// Function to display error toast with message
function showErrorToast(message) {
    toastBody.textContent = message;
    const errorToastInstance = new bootstrap.Toast(errorToast);
    errorToastInstance.show();
}


const handleSignUp = async (e) => {
    e.preventDefault();
    const userData = registerValidator(); 
    try {
        const response = await axios.post('http://localhost:3005/api/register', userData);
        if (response.status === 200) {
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('qrImagePath', response.data.image);
            localStorage.setItem('qrSecret', response.data.qrSecret);
            window.location.href = 'verify.html';
        }
    } catch (error) {
        showErrorToast(error);
      }
}


const handleSignIn = async (e) => {
    e.preventDefault();
    
    try {
        const userData = loginValidator();
        
        const loginResponse = await axios.post('http://localhost:3005/api/login', userData);

        if (loginResponse.status === 200) {
            localStorage.setItem('userToken', loginResponse.data.token);
            window.location.href = 'index.html';
        } else if (loginResponse.status === 400) {
            const config = {
                headers: {
                    'Authorization': `Bearer ${loginResponse.data.token}`
                }
            };
            const qrResponse = await axios.post('http://localhost:3005/api/getQR', null, config);

            if (qrResponse.status === 201) {
                localStorage.setItem('userToken', qrResponse.data.token);
                localStorage.setItem('qrImagePath', qrResponse.data.image);
                localStorage.setItem('qrSecret', qrResponse.data.qrSecret);
                window.location.href = 'verify.html';
            }
        }
    } catch(error) {
        showErrorToast(error);
    }
}

const validateUser = async (e) => {
    e.preventDefault();
    try{
        const userData = validValidator();
        const firstResponse = await axios.post('http://localhost:3005/api/validateUser', userData);
        if(firstResponse.status === 201){
            localStorage.setItem('userToken', firstResponse.data.token);
            hideValidationInput();
        }
    }
    catch(error){
        showErrorToast(error);
    }
}


const handleForgotPassword = async (e) => {
    e.preventDefault();
    try{
        const userData = forgotValidator();
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        };
        const response = await axios.post('http://localhost:3005/api/changePassword', userData, config);
        if(response.status === 200){
            window.location.href = 'login.html'
        }
    }
    catch(error){
        showErrorToast(error);
    }
}


function hideValidationInput(){
    let validInputs = document.querySelectorAll('.validInput');
    let nonValidateInputs = document.querySelectorAll('.non-validInput');
    if(validInputs.length > 0 && validInputs){
        validInputs.forEach(input => {
            input.classList.add('d-none');
        });
    }
    if(nonValidateInputs.length > 0 && nonValidateInputs){
        nonValidateInputs.forEach(input => {
            input.classList.remove('d-none');
        });
    }

}



const registerBtn = document.querySelector('.register-btn');
if(registerBtn){
    registerBtn.addEventListener('click', handleSignUp);
}

const loginBtn = document.querySelector('.login-btn');
if(loginBtn){
    loginBtn.addEventListener('click', handleSignIn);
}

const validBtn = document.querySelector('.valid-btn');
if(validBtn){
    validBtn.addEventListener('click', validateUser);
}

const forgotBtn = document.querySelector('.resetPassword-btn');
if(forgotBtn){
    forgotBtn.addEventListener('click', handleForgotPassword);
}