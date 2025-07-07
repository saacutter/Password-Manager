const passwordsDiv = document.querySelector('#passwords');

// Clear the div to remove elements already there
let children = passwordsDiv.children;
if (children.length > 0) {
    while (passwordsDiv.firstChild) {
        passwordsDiv.removeChild(passwordsDiv.firstChild);
    }
}

// Make the request to the designated route
var request = new XMLHttpRequest();
request.open('POST', '/get_passwords', true);
request.onload = () => {
    // Ensure that the request was successful
    if (request.status == 200) {
        // Parse the result
        passwords = JSON.parse(request.responseText);
        
        // Display an error message if no passwords associated with the user were found
        if (passwords.length == 0) {
            let div = document.querySelector('button');
            div.insertAdjacentHTML('beforebegin', '<div><p class="center text-2xl font-extrabold m-3 p-2">There is nothing to see here!</p></div>');
            return;
        } 
        
        // Add a div to represent each password retrieved
        for (let i = 0; i < passwords.length; i++) {
            addPasswordDiv(passwords[i]);
            document.querySelector('#password-' + passwords[i].id + ' div').addEventListener('click', () => addPasswordDetails(passwords[i].id)); // Add an event listener to show the password details on click
        }
    } else {
        return;
    }
};
request.send();

function addPasswordDiv(password) {
    // Identify the website source and manipulate as appropriate
    let src = password.website.startsWith('http') ? password.website : `https://${password.website}`;
    if (src === "https://") src = "";

    // Process the passsword's fields
    let username = password.username.length > 0 ? password.username : "No username provided.";

    // Add the password to the page
    passwordsDiv.insertAdjacentHTML('beforeend', `
        <div id="password-${password.id}">
            <div class="flex items-center black-border round-border mb-2 h-20 w-full gap-2 hover:cursor-pointer hover:bg-gray-500">
                <a href="${src}" class="flex w-fit">
                    <img src="http://www.google.com/s2/favicons?domain=${password.website}" onerror="if (this.src === 'http://www.google.com/s2/favicons?domain=') this.src='https://cdn-icons-png.flaticon.com/256/766/766742.png';" alt="Website Icon" class="scale-75 square-border">
                </a>
                <div class="flex-col">
                    <p class="font-bold text-xl">${password.name}</p>
                    <p class="text-base">${username}</p>
                </div>
            </div>
        </div>
    `); // Image onerror handler adapted from https://stackoverflow.com/questions/61106830/updating-the-default-img-src-in-html-when-the-img-src-doesnt-have-a-value
}

function addPasswordDetails(id) {
    // Locate the password object with the specified ID
    let password;
    for (let i = 0; i < passwords.length; i++) {
        if (passwords[i].id == id) {
            password = passwords[i];
            break;
        }
    }

    // Return if the password is not associated with the user
    if (!password) return;

    // Identify the website source and manipulate as appropriate
    let src = password.website.startsWith('http') ? password.website : `https://${password.website}`;
    if (src === "https://") src = ""

    // Process the passsword's fields
    let username = password.username.length > 0 ? password.username : "No username provided.";
    let details = password.details.length > 0 ? password.details : "No details provided.";
    
    // Add the password details to the page
    let div = document.querySelector('#password-' + password.id);
    div.insertAdjacentHTML('beforeend', `
        <div id="password-details-${password.id}" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-2 max-w-lg w-full relative">
                <span class="material-symbols-outlined cursor-pointer text-black flex absolute right-2" id="close">close</span>
                <div class="center">
                    <img src="http://www.google.com/s2/favicons?domain=${password.website}" onerror="if (this.src === 'http://www.google.com/s2/favicons?domain=') this.src='https://cdn-icons-png.flaticon.com/256/766/766742.png';" alt="Website Icon" class="scale-75 square-border center">
                    <p class="font-bold text-xl text-black center mb-3">${password.name}</p>
                </div>
                <div>
                    <h4 class="text-xl font-bold mb-2 text-black">${username}</h4>
                    <div class="flex items-center relative">
                        <input class="mb-2 text-gray-700" type="password" value="${password.password}" readonly>
                        <div class="flex text-black cursor-pointer relative" id="password-visibility">
                            <span class="material-symbols-outlined absolute -top-2 right-2 text-xs" style="user-select: none; font-size: 18px;">visibility</span>
                        </div>
                    </div>
                    <p class="mb-2 text-gray-700"><strong>Details:</strong> ${details}</p>
                </div>
                <div class="text-black">
                    <p><strong>Last Edited:</strong> ${password.last_edited}</p>
                    <p><strong>Created:</strong> ${password.creation_date}</p>
                </div>
                <div class="flex items-center mt-2 w-full gap-2 text-black">
                    <button>Edit</button>
                    <span class="material-symbols-outlined p-2 absolute right-0 mr-4 text-black rounded-full transition hover:cursor-pointer hover:bg-red-500 hover:text-white" style="user-select: none;" id="delete">delete</span>
                </div>
            </div>
        </div>
    `);

    // Add an event listener to close the div on click
    div.querySelector('#close').addEventListener('click', () => hidePasswordDetails(password.id));
    
    // Add an event listener to delete the password on click
    div.querySelector('#delete').addEventListener('click', () => deletePassword(password.id));
    
    // Add functionality to the visibility buttons for the password field (adapted from https://stackoverflow.com/questions/70885518/how-do-i-add-a-password-visibility-button-for-a-text-input)
    let input = div.querySelector('input[type="password"]');
    let visibility = document.querySelector('#password-visibility span');
    visibility.addEventListener('click', setVisibility);
    function setVisibility() {
        if (input.type == "password") {
            input.type = "text";
            visibility.innerHTML = "visibility_off";
        } else {
            input.type = "password";
            visibility.innerHTML = "visibility";
        }
    }
}

function hidePasswordDetails(id) {
    let div = document.querySelector('#password-' + id);
    div.removeChild(div.children[1]);
}

function deletePassword(id) {
    // Find the password div
    let password = document.querySelector('#password-' + id);

    // Make the request to the designated route
    var request = new XMLHttpRequest();
    request.open('POST', '/remove/' + id, true);
    request.onload = () => {
        // Ensure that the request was successful
        if (request.status == 200) {
            // Remove the password from the div
            passwordsDiv.removeChild(password);

            // Check if the user has any passwords left and render the appropriate text
            if (passwordsDiv.querySelectorAll('div').length == 0) {
                let div = document.querySelector('button');
                div.insertAdjacentHTML('beforebegin', '<div><p class="center text-2xl font-extrabold m-3 p-2">There is nothing to see here!</p></div>');
            }
        }
    };
    request.send();
}