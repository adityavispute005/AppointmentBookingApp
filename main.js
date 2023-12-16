// Function to initialize the UI with stored user details
function initUI() {
    // Fetch user details from crudcrud.com using a GET request
    axios.get('https://crudcrud.com/api/fba8dda89409410eabd15fdabd79a98f/appointment')
        .then(function (response) {
            // Handle the success response and update the UI with fetched data
            var userDetailsArray = response.data;

            // Display user details in the UI
            var userList = document.getElementById('userList');
            userList.innerHTML = ''; // Clear previous entries

            userDetailsArray.forEach(function (userDetails, index) {
                var listItem = document.createElement('li');
                listItem.textContent = userDetails.firstName + ' ' + userDetails.lastName + ' ' + userDetails.email + ' ' + userDetails.address + ' ' + userDetails.Phone_no;

                // Create a delete button for each user
                var deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function () {
                    deleteUser(index);
                };

                listItem.appendChild(deleteButton);
                userList.appendChild(listItem);
            });
        })
        .catch(function (error) {
            // Handle errors if the GET request fails
            console.error('Error fetching data from the cloud:', error);
        });
}

// Function to handle form submission
function submitForm() {
    // Get user input
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
    axios.post('https://crudcrud.com/api/fba8dda89409410eabd15fdabd79a98f/appointment', userDetails)
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
}

// Function to delete a user by index
function deleteUser(index) {
    // Fetch user details from crudcrud.com using a GET request
    axios.get('https://crudcrud.com/api/fba8dda89409410eabd15fdabd79a98f/appointment')
        .then(function (response) {
            var userDetailsArray = response.data;

            // Remove the user at the specified index
            userDetailsArray.splice(index, 1);

            // Perform a PUT request using Axios to update the data in the cloud
            axios.put('https://crudcrud.com/api/fba8dda89409410eabd15fdabd79a98f/appointment', userDetailsArray)
                .then(function (putResponse) {
                    // Handle the success response if needed
                    console.log('Data updated in the cloud:', putResponse.data);

                    // Reinitialize the UI
                    initUI();
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


// Initialize UI on page load
document.addEventListener('DOMContentLoaded', function () {
    initUI();
});
