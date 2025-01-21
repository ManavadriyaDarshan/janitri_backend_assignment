# Patient Heart Rate Management System

## 📝 Project Description
A backend system for managing users, patients, and heart rate data. Built with **Spring Boot**, **Hibernate**, and **MySQL**, this system allows user registration, patient management, and heart rate monitoring.

---

## ⚙️ Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Spring Boot, Hibernate (ORM)
- **Database:** MySQL
- **Build Tool:** Maven

---
## 📂 Project Structure and File Details
```
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com.example.Janitri
│   │   │       ├── controller
│   │   │       │   ├── PatientController.java      # Handles patient-related API endpoints
│   │   │       │   ├── UserController.java      # Handles user-related API endpoints
│   │   │       │   └── HeartRateController.java    # Handles heart rate-related API endpoints
│   │   │       ├── dto
│   │   │       │   └── PatientWithHeartRatesDTO.java  # Data transfer object for patient and heart rate data
│   │   │       ├── entity
│   │   │       │   ├── Patient.java               # Patient entity mapping to the patient table
│   │   │       │   ├── HeartRate.java            # Heart rate entity mapping to the heart_rate table
│   │   │       │   └── User.java                # User entity mapping to the user table
│   │   │       ├── repository
│   │   │       │   ├── PatientRepository.java    # JPA repository for Patient entity
│   │   │       │   ├── HeartRateRepository.java  # JPA repository for HeartRate entity
│   │   │       │   └── UserRepository.java       # JPA repository for User entity
│   │   │       └── service
│   │   │           ├── PatientService.java       # Business logic for patient management
│   │   │           ├── HeartRateService.java     # Business logic for heart rate management
│   │   │           └── UserService.java          # Business logic for user management
│   │   └── resources
│   │       ├── static
│   │       │   └── js
│   │       │       └── app.js                   # Handles frontend API interactions
│   │       ├── templates
│   │       │   └── index.html                  # Frontend UI for interacting with the backend
│   │       └── application.properties          # Configuration for database connection
├── pom.xml                                      # Maven project configuration file
└── README.md                                    # Project documentation
```

---


## 📦 Project Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ManavadariyaDarshan/janitri_backend_assignment.git
cd janitri_backend_assignment
```

### 2️⃣ Set Up Database
## 🗄️ Database Structure
- Start **MySQL** and open **PHPMyAdmin**.
- Create a new database:
  ```sql
  CREATE DATABASE janitri;
  ```
### **1. User Table**
```sql
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

### **2. Patient Table**
```sql
CREATE TABLE patient (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
```

### **3. Heart Rate Table**
```sql
CREATE TABLE heart_rate (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    heart_rate INT NOT NULL,
    timestamp DATETIME NOT NULL,
    patient_id BIGINT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patient(id) ON DELETE CASCADE
);
```

### **🔗 Relationships**
- **User → Patient:** One-to-Many (A user can have multiple patients)
- **Patient → HeartRate:** One-to-Many (A patient can have multiple heart rate records)


### 3️⃣ Configure Application
Update the `application.properties` file:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/janitri
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 4️⃣ Run the Project
```bash
mvn clean install
mvn spring-boot:run
```

### 5️⃣ Access the Application
- Base URL: `http://localhost:8080`
- UI: `http://localhost:8080/index.html`

---

## 🔗 API Documentation

### **User APIs**

- **POST** `/api/users/register` → Register a new user
  - **Payload:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "name": "John Doe"
    }
    ```
  - **Response:**
    ```json
    {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    }
    ```

- **POST** `/api/users/login` → User login
  - **Payload:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response:**
    ```json
    {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    }
    ```

### **Patient APIs**

- **POST** `/api/patients` → Add a new patient
  - **Payload:**
    ```json
    {
      "name": "Jane Smith",
      "age": 30,
      "userId": 1
    }
    ```
  - **Response:**
    ```json
    {
      "id": 1,
      "name": "Jane Smith",
      "age": 30,
      "userId": 1
    }
    ```

- **GET** `/api/patients/{id}` → View patient details with heart rates
  - **Response:**
    ```json
    {
      "id": 1,
      "name": "Jane Smith",
      "age": 30,
      "heartRates": [
        {
          "heartRate": 75,
          "timestamp": "2025-01-10T10:00:00"
        }
      ]
    }
    ```

### **Heart Rate APIs**

- **POST** `/api/heart-rate` → Record a heart rate for a patient
  - **Payload:**
    ```json
    {
      "patientId": 1,
      "heartRate": 72
    }
    ```
  - **Response:**
    ```json
    {
      "id": 1,
      "patientId": 1,
      "heartRate": 72,
      "timestamp": "2025-01-10T10:00:00"
    }
    ```

- **GET** `/api/heart-rate/{patientId}` → View all heart rates for a patient
  - **Response:**
    ```json
    [
      {
        "id": 1,
        "patientId": 1,
        "heartRate": 72,
        "timestamp": "2025-01-10T10:00:00"
      },
      {
        "id": 2,
        "patientId": 1,
        "heartRate": 75,
        "timestamp": "2025-01-10T11:00:00"
      }
    ]
    ```

---

## 🗂️ Assumptions & Decisions
- **Password Storage:** Plain text passwords are used; implement hashing in production.
- **Error handling** is minimal and can be expanded for production use.
- The database is assumed to run on **localhost** using **MySQL**.

---

## 🚀 Future Enhancements
- Implement **JWT Authentication** 🔐
- Add **Pagination & Filtering** for large datasets 📊
- Improve **Error Handling** with custom exceptions ⚠️
- Add **Unit & Integration Tests** 🧪

---

## 👨‍💻 Author
**Darshan Manavadariya**  
📧 manavadariyadarshan@gmail.com
