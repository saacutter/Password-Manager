// Add an onclick event listener to the close buttons
let close = document.getElementById('create-close');
let cancel = document.getElementById('cancel');
close.addEventListener('click', () => hideDetails('add-login-panel'));
cancel.addEventListener('click', () => hideDetails('add-login-panel'));

const generateButton = document.querySelector('#generate');
const password = document.querySelector('#password-input');
const div = document.querySelector('#password-generator');

// Add an event listener to generate the random password
generateButton.addEventListener('click', () => {
    div.insertAdjacentHTML('afterbegin', `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-100" id="generation-div">
            <div class="bg-white rounded-lg p-2 relative">
                <div class="flex items-center relative">
                    <input size="64" maxlength="128" readonly class="border" id="password-input-2">
                    <a onclick="passwordFunctionality()" type="hidden"><span class="material-symbols-outlined flex h-full cursor-pointer text-black absolute top-0 right-3 rotate-75" id="generate-2" style="user-select: none;">directory_sync</span></a>
                </div>
                <p>Options</p>
                <div class="flex relative">
                    <div class="flex h-1/2 w-20">
                        <input type="number" placeholder="Length" value=8 size="3" max=128 id="length" class="w-12 border">
                    </div>
                    <div class="flex gap-10" style="align-items: center;" id="options">
                        <div>
                            <label for="uppercase-ckbox" class="mr-2">Uppercase</label>
                            <input type="checkbox" id="uppercase-ckbox" checked>
                        </div>
                        <div>
                            <label for="numbers-ckbox" class="mr-2">Numbers</label>
                            <input type="checkbox" id="numbers-ckbox">
                        </div>
                        <div>
                            <label for="punctuation-ckbox" class="mr-2">Punctuation</label>
                            <input type="checkbox" id="punctuation-ckbox">
                        </div>
                    </div>
                </div>
                <div>
                    <button onclick="save()" class="bg-blue-600 hover:bg-blue-700 text-white transition w-1/6 px-2 py-2 rounded text-sm">Save</button>
                    <button onclick="remove()">Cancel</button>
                </div>
            </div>
        </div>
    `);
    
    // Set the default value of the input to be that of the currently existing field
    generated = document.querySelector('#password-input-2');
    generated.value = password.value;

    // Create references to frequently used objects
    lengthInput = document.querySelector('#length');
    uppercase = document.querySelector('#uppercase-ckbox');
    numbers = document.querySelector('#numbers-ckbox');
    punctuation = document.querySelector('#punctuation-ckbox');
});

function passwordFunctionality() {
    // Get the length input
    length = Number(lengthInput.value);
    if (length < 1 || length > 128) {
        if (!(l = document.querySelector('#too-long'))) {
            passwordInput.insertAdjacentHTML('afterend', `
                <h4 id="too-long">The password can only be a maximum of 128 characters long.</h4>
            `);
        }
        return;
    }

    // Hide the length message if applicable
    if (l = document.querySelector('#too-long')) l.remove();

    // Initialise the default string of characters
    let chars = "abcdefghijklmnopqrstuvwxyz";
    
    // Add the optional characters to the possible choices as applicable
    if (uppercase.checked) {
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (numbers.checked) {
        chars += "1234567890";
    }
    if (punctuation.checked) {
        chars += "!@$^*?#%";
    }

    // Generate the password
    let result = generatePassword(length, chars);

    // Set the value of the password field to the string
    generated.value = result;
}

function generatePassword(length, chars) {
    // Create an empty string to hold the result
    let result = "";

    // Add random characters in the sequence to create a random string of the specified length
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.random() * chars.length);
    }

    return result;
}

function save() {
    password.value = generated.value;
    remove();
}

function remove() {
    document.querySelector('#generation-div').remove();
}