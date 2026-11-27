# CIS 3339 Homework 1: Vue 3 and MongoDB Migration
## Student Management System

A full-stack web application that allows users to manage students, courses, and course enrollments. The application uses Vue 3 for the frontend, Express.js for the backend, and MongoDB for database storage.

## Technologies Used

- Vue 3 (Composition API)
- Vue Router
- Pinia
- Axios
- Vite
- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

### Student Management
- Search for students by name
- Add and delete students
- Prevent duplicate student IDs
- Automatically remove associated enrollments when a student is deleted

### Course Management
- View all available courses
- Add and delete courses
- Prevent duplicate course IDs
- Automatically remove associated enrollments when a course is deleted

### Enrollment Management
- Enroll students in courses
- View and remove enrollments
- Prevent duplicate enrollments
- Validate student and course existence

### Additional Features
- Reusable DataTable and FeedbackMessage components
- Responsive user interface
- Loading, success, and error messages
- Automatic database collection and index initialization
- Integrated frontend and backend production deployment

## Prerequisites

- Node.js and npm
- MongoDB Community Server
- Git

Make sure MongoDB is installed and running before starting the application.

## Installation

From the project root, install the backend dependencies:

```bash
cd backend
npm ci
```

Install the frontend dependencies:

```bash
cd ../frontend
npm ci
```

## Environment Configuration

Create a `.env` file inside the backend directory if one is not already provided.

```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/student_management
```

## Running the Application

### Production Mode

From the frontend directory, build the application:

```bash
npm run build
```

Navigate to the backend directory and start the server:

```bash
cd ../backend
node server.js
```

Open the application in a web browser:

http://localhost:3001

### Development Mode

Start the backend in one terminal:

```bash
cd backend
node server.js
```

Start the frontend in a separate terminal from the project root:

```bash
cd frontend
npm run dev
```

Open http://localhost:5173 or the URL displayed by Vite.

## Application Pages

| Page | Route |
|---|---|
| Student Management | / |
| Course Management | /courses |
| Enrollment Management | /enrollments |

## Project Structure

```text
CIS3339-HW1/
├── backend/
│   ├── config/
│   ├── models/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── router/
│   │   ├── services/
│   │   ├── stores/
│   │   └── views/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

Dependencies and production build files are excluded from the repository and can be regenerated using the installation instructions above.