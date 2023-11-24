function submitAppointment() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    // Validate inputs
    if (name === "" || email === "" || phone === "") {
        alert("Please fill in all fields.");
        return;
        var appointment = { name: name, email: email, phone: phone };
        var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
    
        // Display data on the screen
        displayAppointments();
    }

    // Save data to local storage
    var appointment = { name: name, email: email, phone: phone };
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Display data on the screen
    displayAppointments();
}

function displayAppointments() {
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    var appointmentsList = document.getElementById('appointments');

    // Clear existing list
    appointmentsList.innerHTML = "";

    // Display each appointment
    appointments.forEach(function (appointment, index) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>Name: ${appointment.name}</span>
            <span>Email: ${appointment.email}</span>
            <span>Phone: ${appointment.phone}</span>
            <button class="delete" onclick="deleteAppointment(${index})">Delete</button>
        `;

        appointmentsList.appendChild(listItem);
    });
}

function deleteAppointment(index) {
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Remove the appointment from the array
    appointments.splice(index, 1);

    // Update local storage
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Update the displayed appointments
    displayAppointments();
}

// Display existing appointments on page load
displayAppointments();
