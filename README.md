# 🎓 Course Management System

A Full Stack Course Management System built using **Spring Boot**, **React.js**, and **MySQL/PostgreSQL**.  
This application allows users to manage courses with features like course creation, updating, deletion, prerequisite validation, and responsive frontend integration.

---

# 🚀 Features

## Backend Features
- RESTful API development using Spring Boot
- Create, update, delete, and fetch courses
- Course prerequisite validation
- Global exception handling
- Proper HTTP status codes
- Input validation using Jakarta Validation
- Database integration using JPA/Hibernate
- Docker support

## Frontend Features
- Responsive UI using React.js
- Course listing page
- Add/Edit/Delete course functionality
- API integration with backend
- User-friendly interface

---

# 🛠️ Tech Stack

## Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- MySQL / PostgreSQL

## Frontend
- React.js
- Axios
- Bootstrap / CSS

## Tools & Platforms
- Git & GitHub
- Docker
- Postman

---

# 📂 Project Structure

```bash
course-management-system/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── dto/
│   ├── exception/
│   └── config/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
│
└── docker-compose.yml
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
cd course-management-system
```

---


## Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend will run on:

```bash
http://localhost:8080
```

---

# 💻 Frontend Setup

## Install Dependencies

```bash
cd frontend
npm install
```

## Run Frontend

```bash
npm start
```

Frontend will run on:

```bash
http://localhost:3000
```

---

# 🐳 Docker Setup

Run project using Docker:

```bash
docker-compose up --build
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/{id}` | Get course by ID |
| POST | `/api/courses` | Create course |
| PUT | `/api/courses/{id}` | Update course |
| DELETE | `/api/courses/{id}` | Delete course |

---

# 🧪 Sample JSON

## Create Course

```json
{
  "title": "Java Programming",
  "description": "Complete Java course",
  "duration": 60,
  "prerequisiteCourseId": 1
}
```

---

# 📸 Screenshots

Add your project screenshots here.

Example:
- Dashboard
- Course List
- Add Course Form
- API Testing

---

# 🌟 Future Enhancements

- JWT Authentication & Authorization
- Student Enrollment Module
- Admin Dashboard
- Course Progress Tracking
- Email Notifications
- Cloud Deployment

---

# 👨‍💻 Author

**Prachi Wankar**

