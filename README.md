# Full-Stack Authentication System

A complete authentication system built with **Spring Boot (Java)** backend and **React.js + Bootstrap** frontend, using **MySQL** database and **JWT** for secure authentication.

## Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **Spring Security**
- **MySQL Connector**
- **JWT (jsonwebtoken)**
- **Maven**

### Frontend
- **React 18**
- **Vite**
- **React Router DOM**
- **Axios**
- **Bootstrap 5**
- **React Bootstrap**

### Database
- **MySQL 8.0+**

## Features

- ✅ User Registration with form validation
- ✅ User Login with secure authentication
- ✅ BCrypt password hashing
- ✅ JWT-based authentication (token generation and validation)
- ✅ Protected routes (React) after login
- ✅ Form validation (both frontend and backend)
- ✅ Error handling (invalid login, duplicate email, etc.)
- ✅ CORS configuration
- ✅ Global exception handling
- ✅ Responsive UI with Bootstrap

## Project Structure

```
Auth/
├── backend/
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/auth/
│           │   ├── AuthApplication.java
│           │   ├── controller/
│           │   │   └── AuthController.java
│           │   ├── service/
│           │   │   └── AuthService.java
│           │   ├── repository/
│           │   │   └── UserRepository.java
│           │   ├── entity/
│           │   │   └── User.java
│           │   ├── dto/
│           │   │   ├── LoginRequest.java
│           │   │   ├── RegisterRequest.java
│           │   │   └── AuthResponse.java
│           │   ├── security/
│           │   │   ├── SecurityConfig.java
│           │   │   ├── JwtUtil.java
│           │   │   ├── JwtAuthenticationFilter.java
│           │   │   ├── CustomUserDetailsService.java
│           │   │   └── CustomUserDetails.java
│           │   └── exception/
│           │       └── GlobalExceptionHandler.java
│           └── resources/
│               └── application.properties
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── context/
        │   └── AuthContext.jsx
        ├── services/
        │   └── api.js
        ├── components/
        │   └── Auth/
        │       ├── Login.jsx
        │       └── Register.jsx
        └── pages/
            └── Dashboard.jsx
```

## Prerequisites

- **Java 17** or higher
- **Maven** 3.6+
- **Node.js** 18+ and **npm**
- **MySQL** 8.0+

## Setup Instructions

### 1. Database Setup

1. Install MySQL if not already installed
2. Create a MySQL database or let Spring Boot create it automatically
3. Update database credentials in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/auth_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=your_password
```

**Important**: Replace `your_password` with your actual MySQL root password.

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project with Maven:
```bash
mvn clean install
```

3. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Register User
- **POST** `/api/auth/register`
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Login User
- **POST** `/api/auth/login`
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Error Responses

### Validation Error (400)
```json
{
  "timestamp": "2024-01-01T10:00:00",
  "status": 400,
  "error": "Validation Failed",
  "errors": {
    "email": "Email should be valid",
    "password": "Password must be at least 6 characters"
  }
}
```

### Unauthorized (401)
```json
{
  "timestamp": "2024-01-01T10:00:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid email or password"
}
```

### Bad Request (400) - Duplicate Email
```json
{
  "timestamp": "2024-01-01T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Email already registered"
}
```

## How to Use

1. **Register**: Navigate to `http://localhost:5173/register` and fill in the registration form
2. **Login**: After registration, login with your credentials at `http://localhost:5173/login`
3. **Dashboard**: Upon successful login, you'll be redirected to the protected dashboard at `http://localhost:5173/dashboard`
4. **Logout**: Click the logout button in the dashboard to end your session

## Security Features

- **BCrypt Password Hashing**: Passwords are securely hashed before storing in the database
- **JWT Authentication**: Stateless authentication using JWT tokens
- **Token Expiration**: Tokens expire after 24 hours (configurable)
- **Protected Routes**: Frontend routes are protected using React Router
- **CORS Configuration**: Only allowed origins can access the API
- **Input Validation**: Both frontend and backend validation for all inputs

## Configuration

### JWT Configuration
Update in `backend/src/main/resources/application.properties`:
```properties
jwt.secret=yourSecretKeyHereMakeItVeryLongAndSecureAtLeast256Bits
jwt.expiration=86400000
```

### CORS Configuration
Update in `backend/src/main/resources/application.properties`:
```properties
cors.allowed.origins=http://localhost:5173
```

## Troubleshooting

### Backend Issues

**Problem**: Connection refused to MySQL
**Solution**: 
- Ensure MySQL is running
- Check database credentials in `application.properties`
- Verify MySQL is listening on port 3306

**Problem**: Port 8080 already in use
**Solution**: Change server port in `application.properties`:
```properties
server.port=8081
```

### Frontend Issues

**Problem**: npm install fails
**Solution**: 
- Delete `node_modules` and `package-lock.json`
- Run `npm cache clean --force`
- Run `npm install` again

**Problem**: API calls failing
**Solution**: 
- Ensure backend is running on port 8080
- Check browser console for CORS errors
- Verify API proxy configuration in `vite.config.js`

## Running in Production

### Backend
```bash
mvn clean package
java -jar target/auth-backend-1.0.0.jar
```

### Frontend
```bash
npm run build
npm run preview
```

## License

This project is open source and available for educational purposes.

## Author

Built as a demonstration of full-stack authentication with Spring Boot and React.
