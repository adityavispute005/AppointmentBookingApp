function submitAppointment() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    // Validate inputs
    if (name === "" || email === "" || phone === "") {
        alert("Please fill in all fields.");
        return;
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
    appointments.forEach(function (appointment) {
        var listItem = document.createElement('li');
        listItem.textContent = `Name: ${appointment.name}, Email: ${appointment.email}, Phone: ${appointment.phone}`;
        appointmentsList.appendChild(listItem);
    });
}

// Display existing appointments on page load
displayAppointments();
