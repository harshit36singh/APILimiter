# 🚀 API Limiter Platform

A full-stack API management and rate-limiting platform that allows developers to securely expose APIs, generate API keys, enforce distributed rate limits, and track real-time usage analytics.

Built with **Spring Boot + Redis + MySQL** on the backend and **React** on the frontend.

---

## 📌 Features

### 🔐 Authentication & Security
- JWT-based user authentication
- Secure login & registration
- Spring Security with custom JWT filter
- Role separation between API owners and API consumers

### 🔑 API Key Management
- Generate unique API keys per project
- Enable / disable API keys
- API keys scoped strictly to projects
- Validation to prevent cross-project key usage

### ⚡ Distributed Rate Limiting
- Redis-backed rate limiting using Bucket4j
- Per-API-key request limits
- Configurable rate limit windows
- Works across multiple application instances

### 📊 Usage Analytics & Logging
Logs every API request with:
- API key
- Project
- Timestamp
- Client IP

Analytics endpoints for:
- Per-API-key usage
- Hourly usage (last 24 hours)
- Daily project usage reports

### 🌐 Public API Gateway
- Public endpoint for consuming protected APIs
- API key validation + rate limiting enforced
- Transparent proxy to user-defined API URLs

### 🧪 Testing & Quality
- Unit tests with JUnit 5 & Mockito
- Service-level testing for business logic
- Clean Maven dependency management
- Swagger (OpenAPI) documentation

---

## 🧠 System Architecture

```
Client (React)
   |
   | JWT
   v
Spring Boot Backend
   ├── Authentication Service
   ├── Project Service
   ├── API Key Service
   ├── Rate Limiting Service (Redis + Bucket4j)
   ├── Logging & Analytics Service
   |
   ├── MySQL (Users, Projects, API Keys, Logs)
   └── Redis (Distributed Rate Limiting)
```

---

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA (Hibernate)
- MySQL
- Redis
- Bucket4j
- ModelMapper
- Swagger / OpenAPI
- JUnit 5 & Mockito

### Frontend
- React
- Axios
- Modern component-based UI
- JWT-based authentication flow

---

## 📂 Project Structure (Backend)

```
src/main/java/com/example/apilimiter
├── config        # Security, Redis, Swagger, Beans
├── controller    # REST controllers
├── service       # Business logic
├── repository    # JPA repositories
├── entities      # JPA entities
├── dto           # Request / Response DTOs
├── security      # JWT utilities & filters
└── util          # Helpers & generators
```

---

## 🔑 API Flow Overview

### 1️⃣ User Authentication
- `POST /auth/register`
- `POST /auth/login` → returns JWT

### 2️⃣ Project Management
- Create and manage projects
- Each project has a unique shortname
- Each project points to a target API URL

### 3️⃣ API Key Generation
- Generate API keys per project
- Keys are prefixed (`apik_`)
- Keys can be disabled at any time

### 4️⃣ Public API Consumption
```http
GET /apilimiter/{projectShortName}
Authorization: apik_xxxxxxxxx
```

**Flow:**
1. API key validated
2. Rate limit enforced
3. Request logged
4. Target API response returned

---

## 📊 Analytics Endpoints

### Per API Key Usage
```http
GET /usage/{projectShortName}
```

### Hourly API Key Usage (last 24 hours)
```http
GET /usagegraph/apikey/24/{apiKeyId}
```

### Daily Project Usage
```http
GET /usagegraph/project/daily/{projectId}
```

---

## 🧪 Running Tests

```bash
mvn clean test
```

✔ Unit tests for core services  
✔ Mockito-based isolation  
✔ No external dependencies required

---

## 📘 API Documentation (Swagger)

Swagger UI available at:
```
http://localhost:8080/swagger-ui/index.html
```

**Supports:**
- JWT authorization
- Public & secured endpoint testing
- Request/response schemas

---

## ⚙️ Setup Instructions

### Prerequisites
- Java 17+
- Maven
- MySQL
- Redis

### Backend Setup
```bash
git clone https://github.com/your-username/apilimiter.git
cd apilimiter
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Configuration

Example `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/apilimiter
spring.datasource.username=root
spring.datasource.password=password

spring.redis.host=localhost
spring.redis.port=6379

jwt.secretkey=your-secret-key
```

---

## 🎯 Why This Project?

This project was built to demonstrate:
- Real-world backend system design
- Secure API exposure using API keys
- Distributed rate limiting
- Analytics & observability
- Clean architecture and testable code

---

## 🧑‍💻 Author

Harshit Singh
Backend Developer

**Skills:** Java | Spring Boot | Redis | React  
**Focus:** Scalable and secure backend systems

---

## ⭐ Future Improvements

- [ ] Role-based access control (RBAC)
- [ ] API key rotation
- [ ] Webhook support
- [ ] Docker & CI/CD pipeline

---

## 📄 License

This project is for learning and demonstration purposes.

---

