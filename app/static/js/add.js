document.addEventListener('DOMContentLoaded', function() {
    // Add an onclick event listener to the close buttons
    let close = document.getElementById('create-close');
    let cancel = document.getElementById('cancel');
    close.addEventListener('click', () => hideDetails('add-login-panel'));
    cancel.addEventListener('click', () => hideDetails('add-login-panel'));

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