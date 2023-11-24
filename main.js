function submitAppointment() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    // Validate inputs
    if (name === "" || email === "" || phone === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Check if editing an existing appointment
    var editIndex = document.getElementById('editIndex').value;

    if (editIndex !== "") {
        // Editing an existing appointment
        editAppointment(editIndex, name, email, phone);
    } else {
        // Save data to local storage
        var appointment = { name: name, email: email, phone: phone };
        var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        // Display data on the screen
        displayAppointments();
    }

    // Reset the form
    document.getElementById('appointmentForm').reset();
    document.getElementById('editIndex').value = "";
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
            <button class="edit" onclick="prepareEdit(${index})">Edit</button>
            <button class="delete" onclick="deleteAppointment(${index})">Delete</button>
        `;

        appointmentsList.appendChild(listItem);
    });
}

function prepareEdit(index) {
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    var appointment = appointments[index];

    // Set values in the form for editing
    document.getElementById('name').value = appointment.name;
    document.getElementById('email').value = appointment.email;
    document.getElementById('phone').value = appointment.phone;
    document.getElementById('editIndex').value = index;
}

function editAppointment(index, newName, newEmail, newPhone) {
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    var editedAppointment = { name: newName, email: newEmail, phone: newPhone };

    // Update the appointment in the array
    appointments[index] = editedAppointment;

    // Update local storage
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Update the displayed appointments
    displayAppointments();
}
