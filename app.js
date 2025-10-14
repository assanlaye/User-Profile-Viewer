// Function to fetch users from the API
async function fetchUsers() {
    try {
        // Show loading message
        document.getElementById('userList').innerHTML = '<div class="loading">Loading users...</div>';
        
        // Fetch data from API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.status}`);
        }
        
        const users = await response.json();
        
        // Display the user list
        displayUserList(users);
        
    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        displayError(error.message);
    }
}

// Function to display the list of users
function displayUserList(users) {
    const userListElement = document.getElementById('userList');

    userListElement.innerHTML = '';

    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.className = 'user-item';
        userItem.innerHTML = `
            <div class="user-name">${user.name}</div>
            <div class="user-username">@${user.username}</div>
        `;

        userItem.addEventListener('click', function() {
            document.querySelectorAll('.user-item').forEach(item => {
                item.classList.remove('active');
            });
            
            userItem.classList.add('active');
            
            displayUserDetails(user);
        });
        
        userListElement.appendChild(userItem);
    });
}

// Function to display user details
function displayUserDetails(user) {
    const userDetailsElement = document.getElementById('userDetails');

    userDetailsElement.innerHTML = `
        <div class="user-detail">
            <div class="detail-label">Name</div>
            <div class="detail-value">${user.name}</div>
        </div>
        
        <div class="user-detail">
            <div class="detail-label">Username</div>
            <div class="detail-value">${user.username}</div>
        </div>
        
        <div class="user-detail">
            <div class="detail-label">Email</div>
            <div class="detail-value">${user.email}</div>
        </div>
        
        <div class="user-detail">
            <div class="detail-label">Phone</div>
            <div class="detail-value">${user.phone}</div>
        </div>
        
        <div class="user-detail">
            <div class="detail-label">Website</div>
            <div class="detail-value">${user.website}</div>
        </div>
        
        <div class="user-detail">
            <div class="detail-label">Address</div>
            <div class="address-section">
                <div class="detail-value">${user.address.street}, ${user.address.suite}</div>
                <div class="detail-value">${user.address.city}, ${user.address.zipcode}</div>
            </div>
        </div>
        
        <div class="user-detail">
            <div class="detail-label">Company</div>
            <div class="company-section">
                <div class="section-title-small">${user.company.name}</div>
                <div class="detail-value">${user.company.catchPhrase}</div>
            </div>
        </div>
    `;
}

// Function to display error message
function displayError(message) {
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = `
        <div class="error">
            <p>Failed to load users: ${message}</p>
            <button class="retry-btn" onclick="fetchUsers()">Try Again</button>
        </div>
    `;
}

// Start the application when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);