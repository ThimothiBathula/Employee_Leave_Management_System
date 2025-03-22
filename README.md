# Employee Leave Management System

## Overview

A simple **Leave Management System** built using **Node.js**, **Express**, and **MySQL**. This system allows employees to request leave, and administrators to manage leave requests.

## Features

- Submit a leave request.
- Fetch all leave requests.
- Approve/Reject a leave request.
- Fetch leave requests of a specific employee.

## Technologies Used

- **Node.js** (Express.js)
- **MySQL** (mysql2 package)
- **Postman** (for API testing)

---

## Installation and Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/ThimothiBathula/Employee-Leave-Management-System.git
cd leave-management
```

### 2️⃣ Install Dependencies

```sh
npm install express mysql2 dotenv body-parser cors
```

### 3️⃣ Configure the Database

Create a MySQL database named `leave_management`, then run the following SQL commands:

```sql
CREATE TABLE Employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL
);

CREATE TABLE LeaveRequests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    reason TEXT,
    FOREIGN KEY (employee_id) REFERENCES Employees(id) ON DELETE CASCADE
);
```

### 4️⃣ Set Up Database Connection

Edit `Db.js` with your MySQL credentials:

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'leave_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
```

### 5️⃣ Start the Server

```sh
npm start
```

The server will run on **[http://localhost:3000](http://localhost:3000)**.

---

## API Endpoints

### 1️⃣ **Submit a Leave Request**

**POST** `/leave`

```json
{
  "employee_id": 1,
  "start_date": "2025-04-01",
  "end_date": "2025-04-05",
  "reason": "Family vacation"
}
```

### 2️⃣ **Fetch All Leave Requests**

**GET** `/leave`

### 3️⃣ **Approve/Reject a Leave Request**

**PUT** `/leave/:id`

```json
{
  "status": "approved"
}
```

### 4️⃣ **Fetch Leave Requests of an Employee**

**GET** `/leave/employee/:employee_id`

---

## Testing

- Use **Postman** or **cURL** to test the API endpoints.
- Check the database using MySQL commands.

---

## Author

Developed by **THIMOTHI**.

