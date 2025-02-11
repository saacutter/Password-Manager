document.addEventListener('DOMContentLoaded', function() {
    // Hide the signup panel when the page loads
    let suPanel = document.querySelector('#signup');
    suPanel.style.display = "none";

    // Identify the 'signup' button and listen for clicks
    let suButton = document.querySelector('#signup-btn');
    suButton.addEventListener('click', function() {
        // Hide the login panel
        var login = document.querySelector('#login');
        login.classList.add('fade-out');
        login.style.display = "none"; 
        setTimeout(() => {
            login.classList.remove('fade-out');
        }, 2000);

        // Show the signup panel
        var signup = document.querySelector('#signup');
        signup.style.display = "block";
        signup.classList.add('fade-in');
        setTimeout(() => {
            signup.classList.remove('fade-in');
        }, 2000);

        // Update the title to reflect the current view
        document.title = "CS50 Password | Sign Up";
    });

    let liButton = document.querySelector('#login-btn');
    liButton.addEventListener('click', function() {
        // Hide the signup panel
        var signup = document.querySelector('#signup');
        signup.classList.add('fade-out');
        signup.style.display = "none";
        setTimeout(() => {
            signup.classList.remove('fade-out');
        }, 2000);

        // Show the login panel
        var login = document.querySelector('#login');
        login.style.display = "block";
        login.classList.add('fade-in');
        setTimeout(() => {
            login.classList.remove('fade-in');
        }, 2000);

        // Update the title to reflect the current view
        document.title = "CS50 Password | Sign In";
    });
});