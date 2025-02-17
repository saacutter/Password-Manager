document.addEventListener('DOMContentLoaded', function() {
    // Hide the signup panel when the page loads
    let signup = document.querySelector('#signup');
    signup.style.display = "none";

    // Show the login panel when the page loads
    let login = document.querySelector('#login');
    login.style.display = "block";

    // Identify the 'signup' button and listen for clicks
    let suButton = document.querySelector('#signup-btn');
    suButton.addEventListener('click', function() {
        // Hide the login panel
        disableInputs(login.querySelectorAll('button, input'));
        login.classList.add('fade-out');
        login.style.display = "none"; 
        setTimeout(() => {
            login.classList.remove('fade-out');
        }, 2000);

        // Show the signup panel
        signup.style.display = "block";
        signup.classList.add('fade-in');
        setTimeout(() => {
            signup.classList.remove('fade-in');
            enableInputs(signup.querySelectorAll('button, input'));
        }, 2000);

        // Update the title to reflect the current view
        document.title = "Password Manager | Sign Up";
    });

    let liButton = document.querySelector('#login-btn');
    liButton.addEventListener('click', function() {
        // Hide the signup panel
        disableInputs(signup.querySelectorAll('button, input'));
        signup.classList.add('fade-out');
        signup.style.display = "none";
        setTimeout(() => {
            signup.classList.remove('fade-out');
        }, 2000);

        // Show the login panel
        login.style.display = "block";
        login.classList.add('fade-in');
        setTimeout(() => {
            login.classList.remove('fade-in');
            enableInputs(login.querySelectorAll('button, input'));
        }, 2000);

        // Update the title to reflect the current view
        document.title = "Password Manager | Sign In";
    });
});

function disableInputs(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('disabled', true);
    }
}

function enableInputs(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('disabled');
    }
}