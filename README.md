# Patient Heart Rate Management System

## 📝 Project Description
A backend and frontend integrated system to manage patient details and monitor their heart rates. Built with **Spring Boot**, **Hibernate**, and **MySQL**, this project allows user registration, patient management, and tracking heart rate records.

## ⚙️ Technologies Used
- **Backend:** Spring Boot, Hibernate (ORM)
- **Database:** MySQL, PHPMyAdmin
- **Frontend:** HTML, CSS, JavaScript
- **Build Tool:** Maven

## 📦 Project Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ManavadriyaDarshan/janitri_backend_assignment
cd janitri_backend_assignment
```

### 2️⃣ Set Up Database
- Start **MySQL** and open **PHPMyAdmin**.
- Create a new database:
  ```sql
  CREATE DATABASE patient_management;
  ```
- Import the provided SQL schema if necessary.

### 3️⃣ Configure Application
Update the `application.properties` file:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/patient_management
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

---

## 🗄️ Database Schema

### **User Table**
```sql
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

### **Patient Table**
```sql
CREATE TABLE patient (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
```

### **Heart Rate Table**
```sql
CREATE TABLE heart_rate (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    heart_rate INT NOT NULL,
    timestamp DATETIME NOT NULL,
    patient_id BIGINT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patient(id)
);
```

---

## 🔗 API Endpoints

### **User APIs**
- **POST** `/users/register` → Register a new user
- **POST** `/users/login` → User login

### **Patient APIs**
- **POST** `/patients` → Add a new patient
- **GET** `/patients/{id}` → View patient details with heart rates

### **Heart Rate APIs**
- **POST** `/heartrates` → Add a heart rate for a patient
- **GET** `/heartrates/{patientId}` → View all heart rates for a patient

---

## 💻 Frontend Features
- **User Authentication**: Registration and Login
- **Patient Management**: Add and View Patients
- **Heart Rate Management**: Record and View Heart Rates

---

## 👨‍💻 Author
**Darshan Manavadariya**  
📧 manavadariyadarshan@example.com

