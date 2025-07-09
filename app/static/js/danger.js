document.querySelector('#delete').addEventListener('click', () => {
    document.querySelector('#user-profile-panel').insertAdjacentHTML('afterbegin', `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" id="overlay">
            <div class="bg-white rounded-lg p-2 max-w-lg w-70 relative">
                <h1 class="center" style="color: black;">Are you sure you want to delete?</h1>
                <div class="center">
                    <button onclick="deleteAccount()" class="border round-border bg-red-600 text-white">DELETE</button>
                    <button onclick="document.querySelector('#overlay').remove();" class="border round-border bg-blue-400 text-white">Cancel</button>
                </div>
            </div>
        </div>
    `);
});

function deleteAccount() {
    // Make the request to the designated route
    var request = new XMLHttpRequest();
    request.open('POST', '/delete', true);
    request.send();
}

document.querySelector('#purge').addEventListener('click', () => {
    var request = new XMLHttpRequest();
    request.open('POST', '/purge', true);
    request.onload = () => {
        // Ensure that the request was successful
        if (request.status == 200) {
            location.href = '/';
        }
    };
    request.send();
});