// main.js
// Function to fetch user details from the cloud
function fetchUserDetails() {
    return axios.get('https://crudcrud.com/api/15cfa1dfc071418eb8cf03788ec75575/appointment');
}

// Function to update user details in the cloud
function updateUserDetails(userDetailsArray) {
    return axios.put('https://crudcrud.com/api/15cfa1dfc071418eb8cf03788ec75575/appointment', { data: userDetailsArray });
}

// Function to initialize the UI with stored user details
function initUI() {
    // Fetch user details from the cloud
    fetchUserDetails()
        .then(function (response) {
            var userDetailsArray = response.data;

            // Display user details in the UI
            var userList = document.getElementById('userList');
            userList.innerHTML = ''; // Clear previous entries

            userDetailsArray.forEach(function (userDetails, index) {
                var listItem = document.createElement('li');

                // Unicode character for the trash can icon
                var trashIcon = '\u{1F5D1}'; // You can customize this to your liking

                // Create a delete icon for each user
                var deleteButton = document.createElement('button');
                deleteButton.innerHTML = trashIcon;
                deleteButton.style.cursor = 'pointer';
                deleteButton.onclick = function () {
                    deleteUser(index, userDetails._id);
                };

                // Display user details in the list item
                listItem.textContent = userDetails.firstName + ' ' + userDetails.lastName + ' ' + userDetails.email + ' ' + userDetails.address + ' ' + userDetails.Phone_no + ' ';

                // Append the delete button to the list item
                listItem.appendChild(deleteButton);

                // Append the list item to the user list
                userList.appendChild(listItem);
            });
        })
        .catch(function (error) {
            // Handle errors if the GET request fails
            console.error('Error fetching data from the cloud:', error);
        });
}

// Function to delete a user by index
function deleteUser(index, userId) {
    // Fetch user details from the cloud
    fetchUserDetails()
        .then(function (response) {
            var userDetailsArray = response.data;

            // Update user details in the cloud
            updateUserDetails(userDetailsArray.filter(user => user._id !== userId))
                .then(function (putResponse) {
                    // Handle the success response if needed
                    console.log('Data updated in the cloud:', putResponse.data);

                    // Remove the user from the UI
                    var userList = document.getElementById('userList');
                    userList.removeChild(userList.childNodes[index]);

                    // Alternatively, you can clear the entire list and reinitialize it
                    // userList.innerHTML = '';
                    // initUI();
                })
                .catch(function (putError) {
                    // Handle errors if the PUT request fails
                    console.error('Error updating data in the cloud:', putError);
                });
        })
        .catch(function (error) {
            // Handle errors if the GET request fails
            console.error('Error fetching data from the cloud:', error);
        });
}

// Function to handle form submission
function submitForm() {
    // ... (your existing submitForm code)
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var Phone_no = document.getElementById('Phone_no').value;

    // Create an object to store user details
    var userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        Phone_no: Phone_no
    };

    // Perform a POST request using Axios to store the data in the cloud
    axios.post('https://crudcrud.com/api/15cfa1dfc071418eb8cf03788ec75575/appointment', userDetails)
        .then(function (response) {
            // Handle the success response if needed
            console.log('Data stored in the cloud:', response.data);

            // You may choose to do something with the response, but for now, let's reinitialize the UI
            initUI();
        })
        .catch(function (error) {
            // Handle errors if the POST request fails
            console.error('Error storing data in the cloud:', error);
        });
    // After submitting the form, reinitialize the UI
    initUI();
}

// Initialize UI on page load
document.addEventListener('DOMContentLoaded', function () {
    initUI();
});
