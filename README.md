# 📝 Todo App — Full Stack

![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen?style=flat-square&logo=springboot)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?style=flat-square&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-jjwt%200.11.5-black?style=flat-square&logo=jsonwebtokens)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%202.6.0-green?style=flat-square&logo=swagger)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow?style=flat-square&logo=javascript)

A full-stack Todo application with JWT-based authentication, user isolation, and a vanilla JavaScript frontend connected to a Spring Boot REST API backend.

---

## 🚀 Features

- ✅ User Registration & Login with JWT Authentication
- ✅ Spring Security configuration with JWT filter
- ✅ Full CRUD — Create, Read, Update, Delete todos
- ✅ Description field with validation (`@NotBlank`, `@Size(min=5, max=100)`)
- ✅ User isolation — each user sees only their own todos
- ✅ Todo completion toggle with visual strikethrough
- ✅ Pagination support for todo listing
- ✅ Swagger UI for live API documentation
- ✅ Vanilla JavaScript frontend connected to backend

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 21 | Primary language |
| Spring Boot | 3.3.4 | Backend framework |
| Spring Security | (Boot managed) | Authentication & authorization |
| JWT (jjwt) | 0.11.5 | Stateless token-based auth |
| PostgreSQL | - | Relational database |
| JPA / Hibernate | (Boot managed) | ORM for database operations |
| springdoc-openapi | 2.6.0 | Swagger UI / API documentation |
| Lombok | (Boot managed) | Reduce boilerplate code |
| Spring Validation | (Boot managed) | Request body validation |

### Frontend
| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 (Flexbox) | Styling & layout |
| Vanilla JavaScript | Dynamic UI & API calls |

---

## 📁 Project Structure

```
todo-app/
├── springboot-todo-api/               # Spring Boot Backend
│   ├── src/main/java/com/practice/demoversion/
│   │   ├── controller/
│   │   │   ├── AuthController.java    # Register & Login endpoints
│   │   │   └── TodoController.java    # Todo CRUD endpoints
│   │   ├── models/
│   │   │   ├── Todo.java              # Todo entity with user relationship
│   │   │   └── User.java              # User entity
│   │   ├── repository/
│   │   │   ├── TodoRepository.java    # Todo DB queries with user filter
│   │   │   └── UserRepository.java    # User DB queries
│   │   ├── service/
│   │   │   ├── TodoService.java       # Todo business logic
│   │   │   └── UserService.java       # User business logic
│   │   ├── utils/
│   │   │   └── JwtUtil.java           # JWT token generation & validation
│   │   ├── JwtFilter.java             # JWT request interceptor
│   │   └── SecurityConfig.java        # Spring Security configuration
│   └── src/main/resources/
│       └── application.properties     # App config (port, DB)
│
└── todo-vanilla-js/                   # Vanilla JS Frontend
    ├── login.html                     # Login page
    ├── register.html                  # Register page
    ├── todos.html                     # Main todo page
    ├── script.js                      # API calls & DOM manipulation
    └── style.css                      # Styling
```

---

## ⚙️ Getting Started

### Prerequisites
- Java 21+
- PostgreSQL installed and running
- Maven

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/Sanjay-Ramesh/todo-app.git
cd todo-app/springboot-todo-api
```

2. Create a PostgreSQL database:
```sql
CREATE DATABASE todosdb;
```

3. Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/todosdb
spring.datasource.username=your_username
spring.datasource.password=your_password
```

4. Run the application:
```bash
./mvnw spring-boot:run
```

Backend runs on: `http://localhost:8081`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd todo-app/todo-vanilla-js
```

2. Open `login.html` in your browser or use **Live Server** extension in VS Code.

> ⚠️ Make sure backend is running on port 8081 before opening the frontend.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Register new user | ❌ |
| POST | `/api/v1/auth/login` | Login and get JWT token | ❌ |

### Todo
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/v1/todo` | Get all todos for logged-in user | ✅ |
| GET | `/api/v1/todo/{id}` | Get todo by ID | ✅ |
| POST | `/api/v1/todo/create` | Create new todo | ✅ |
| PUT | `/api/v1/todo` | Update existing todo | ✅ |
| DELETE | `/api/v1/todo/{id}` | Delete todo by ID | ✅ |
| DELETE | `/api/v1/todo` | Delete todo by request body | ✅ |
| GET | `/api/v1/todo/page` | Get todos with pagination | ✅ |

### Swagger UI
```
http://localhost:8081/swagger-ui/index.html
```

---

## 🔐 Authentication Flow

```
User registers / logs in
        ↓
Backend validates credentials
        ↓
JWT token generated and returned
        ↓
Frontend stores token in localStorage
        ↓
Every API request sends token in Authorization header
        ↓
JwtFilter validates token on every request
        ↓
SecurityContextHolder stores authenticated user
        ↓
User sees only their own todos (user isolation)
```

---

## 💡 What I Built Beyond the Tutorial

This project was built following CodeIO Tamil's Spring Boot course. After completing the core tutorial, I independently added:

- **Description field** — Added `description` field to the `Todo` entity with validation (`@NotBlank`, `@Size(min=5, max=100)`), updated all API endpoints, and built the complete frontend UI — including input field, card display, and CSS styling — entirely on my own.

- **User isolation** — Identified and fixed a critical bug where all users were seeing the same todos. Implemented per-user data filtering using `SecurityContextHolder` to extract the logged-in user's email from the JWT token, then filtered todos by `@ManyToOne` user relationship.

---

## 🗺️ Planned Features (v2)

- [ ] Logout functionality
- [ ] Inline code comments throughout codebase for better readability
- [ ] Todo priority levels (High / Medium / Low)
- [ ] Due date for todos

---

## 👨‍💻 Author

**Sanjay R**
- GitHub: [@Sanjay-Ramesh](https://github.com/Sanjay-Ramesh)
- LinkedIn: [Sanjay R](https://www.linkedin.com/in/sanjay-ramesh-92826a262/)

---

> *"Learning with curiosity, building with purpose."*
