document.addEventListener('DOMContentLoaded', function() {
    // Hide the entry form div
    var entryForm = document.querySelector('#add-login-panel');
    entryForm.style.display = "none";

    var body = document.querySelector('.main-page');
    var addButton = document.querySelector('#add-btn');
    addButton.addEventListener('click', function() {
        // Show the form
        entryForm.style.display = "block";

        // Disable the background
        body.setAttribute('disabled', true);
    });

    var closeButton = document.querySelector('#create-close');
    closeButton.addEventListener('click', function() {
        // Hide the form
        entryForm.style.display = "none";

        // Enable the background
        body.setAttribute('disabled', false);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var options = document.querySelector('#options-div');
    options.style.display = "none";

    var select = document.querySelector('#option-select');
    var opened = false;
    select.addEventListener('click', function() {
        if (!opened) {
            options.style.display = "block";
            opened = true;
        } else {
            options.style.display = "none";
            opened = false;
        }
    });
});