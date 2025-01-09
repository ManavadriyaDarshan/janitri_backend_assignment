const API_BASE_URL = "http://localhost:8080"; // Update if your backend is hosted elsewhere

// Handle User Registration
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        alert("User registered successfully!");
    } else {
        alert("Registration failed!");
    }
});

// Handle User Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        alert("Login successful!");
    } else {
        alert("Login failed!");
    }
});


// Handle Adding Patient
document.getElementById("addPatientForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("patientName").value;
    const age = document.getElementById("patientAge").value;

    const response = await fetch(`${API_BASE_URL}/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, user: { id: 1 } }), // Replace '1' with actual user ID if needed
    });

    if (response.ok) {
        alert("Patient added successfully!");
    } else {
        alert("Failed to add patient!");
    }
});


// Handle Viewing Patient Details
document.getElementById("viewPatientForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const patientId = document.getElementById("patientId").value;

    try {
        const response = await fetch(`${API_BASE_URL}/patients/${patientId}`);
        if (!response.ok) {
            const errorText = await response.text(); // Get backend error message
            throw new Error(`Status: ${response.status}, Message: ${errorText}`);
        }
        const patient = await response.json();

        // Display Patient Details
        const patientDetails = document.getElementById("patientDetails");
        patientDetails.innerHTML = `
            <p><strong>ID:</strong> ${patient.id}</p>
            <p><strong>Name:</strong> ${patient.name}</p>
            <p><strong>Age:</strong> ${patient.age}</p>
            <h3>Heart Rates:</h3>
        `;

        // Display Associated Heart Rates
        const heartRates = patient.heartRates;
        if (heartRates && heartRates.length > 0) {
            heartRates.forEach((hr) => {
                const hrDiv = document.createElement("div");
                hrDiv.textContent = `Heart Rate: ${hr.heartRate}, Timestamp: ${hr.timestamp}`;
                patientDetails.appendChild(hrDiv);
            });
        } else {
            patientDetails.innerHTML += "<p>No heart rate records found.</p>";
        }
    } catch (error) {
        console.error("Error fetching patient details:", error);
        alert("Unable to fetch patient details. Check console for details.");
    }
});


// Handle Adding Heart Rate
document.getElementById("addHeartRateForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const heartRate = document.getElementById("heartRate").value;
    const patientId = document.getElementById("patientIdForAdd").value;

    const currentTimestamp = new Date().toISOString(); // Get current timestamp

    try {
        const response = await fetch(`${API_BASE_URL}/heartrates`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                heartRate: parseInt(heartRate),
                timestamp: currentTimestamp,
                patient: { id: parseInt(patientId) }
            }),
        });

        if (!response.ok) throw new Error("Failed to add heart rate");
        alert("Heart rate added successfully!");
    } catch (error) {
        console.error("Error adding heart rate:", error);
        alert("Unable to add heart rate. Check console for details.");
    }
});

// Handle Viewing Heart Rates by Patient ID
document.getElementById("viewHeartRateForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const patientId = document.getElementById("patientIdForView").value;

    try {
        const response = await fetch(`${API_BASE_URL}/heartrates/${patientId}`);
        if (!response.ok) throw new Error("Failed to fetch heart rates");
        const heartRates = await response.json();

        const heartRatesList = document.getElementById("heartRatesList");
        heartRatesList.innerHTML = ""; // Clear previous results
        heartRates.forEach((heartRate) => {
            const div = document.createElement("div");
            div.textContent = `Heart Rate: ${heartRate.heartRate}, Timestamp: ${heartRate.timestamp}`;
            heartRatesList.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching heart rates:", error);
        alert("Unable to fetch heart rates. Check console for details.");
    }
});
