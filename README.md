# 🚀 API Limiter Platform

A full-stack API management and rate-limiting platform that allows developers to securely expose APIs, generate API keys, enforce distributed rate limits, and track real-time usage analytics.

Built with **Spring Boot + Redis + MySQL** on the backend and **React** on the frontend.

---

## 🧱 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA (Hibernate)
- MySQL
- Redis (Bucket4j for rate limiting)
- ModelMapper
- Swagger / OpenAPI
- JUnit 5 & Mockito

### Frontend
- React
- Vite
- Modern component-based UI
- JWT-based authentication flow

### Infrastructure
- Docker
- Docker Compose

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

## 📂 Project Structure

```
APILimiter/
├── Backend/
│   └── apilimiter/               # Spring Boot backend
│       ├── src/main/java/com/example/apilimiter
│       │   ├── config            # Security, Redis, Swagger, Beans
│       │   ├── controller        # REST controllers
│       │   ├── service           # Business logic
│       │   ├── repository        # JPA repositories
│       │   ├── entities          # JPA entities
│       │   ├── dto               # Request / Response DTOs
│       │   ├── security          # JWT utilities & filters
│       │   └── util              # Helpers & generators
│       └── pom.xml
├── frontend/
│   └── apilimiter/               # React frontend
├── docker-compose.yml
└── README.md
```

---

## ▶️ Quick Start with Docker (Recommended)

### 1️⃣ Prerequisites
- Docker
- Docker Compose

That's it. No need to install Java, Maven, Node.js, MySQL, or Redis locally.

### 2️⃣ Build Backend JAR (one time)

```bash
cd Backend/apilimiter
mvn clean package -DskipTests
cd ../../
```

### 3️⃣ Start Everything

```bash
docker compose up --build
```

This starts:
- MySQL (persistent data)
- Redis (rate limiting)
- Spring Boot backend
- React frontend (dev mode)

### 🌐 Access the Application

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080 |
| Health Check | http://localhost:8080/actuator/health |
| Swagger UI | http://localhost:8080/swagger-ui/index.html |

### 🛑 Stop Everything

```bash
docker compose down
```

To remove all data volumes:

```bash
docker compose down -v
```

---

## ⚙️ Configuration

The backend uses Spring profiles for environment-specific configuration:

- `application.properties` → Local development
- `application-docker.properties` → Docker environment

Docker automatically activates the Docker profile:

```properties
SPRING_PROFILES_ACTIVE=docker
```

### Docker Configuration

Backend connects to services using Docker service names:
- Database: `mysql:3306`
- Cache: `redis:6379`

Secrets (JWT key) are passed via environment variables in `docker-compose.yml`.

### Local Development Configuration

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

## 🔑 API Flow Overview

### 1️⃣ User Authentication
- `POST /auth/register` - Create new account
- `POST /auth/login` - Login and receive JWT token

### 2️⃣ Project Management
- Create and manage projects
- Each project has a unique shortname
- Each project points to a target API URL

### 3️⃣ API Key Generation
- Generate API keys per project
- Keys are prefixed (`apik_`)
- Keys can be enabled/disabled at any time

### 4️⃣ Public API Consumption

```http
GET /apilimiter/{projectShortName}
Authorization: apik_xxxxxxxxx
```

**Request Flow:**
1. API key validated
2. Rate limit enforced (Redis check)
3. Request logged to MySQL
4. Proxied to target API
5. Response returned to client

---

## 📊 Analytics Endpoints

### Per API Key Usage
```http
GET /usage/{projectShortName}
Authorization: Bearer {jwt-token}
```

### Hourly API Key Usage (last 24 hours)
```http
GET /usagegraph/apikey/24/{apiKeyId}
Authorization: Bearer {jwt-token}
```

### Daily Project Usage
```http
GET /usagegraph/project/daily/{projectId}
Authorization: Bearer {jwt-token}
```

---

## 🧪 Running Tests

```bash
cd Backend/apilimiter
mvn clean test
```

✔ Unit tests for core services  
✔ Mockito-based isolation  
✔ No external dependencies required

---

## 🐳 Docker Architecture

### Services

1. **MySQL** - Persistent data storage
   - Users, Projects, API Keys, Request Logs
   - Data persists in Docker volume

2. **Redis** - Rate limiting cache
   - Distributed rate limiting with Bucket4j
   - In-memory, no persistence needed

3. **Backend** - Spring Boot application
   - Connects to MySQL and Redis via service names
   - Exposes REST API on port 8080

4. **Frontend** - React + Vite
   - Development server on port 5173
   - Proxies API requests to backend

### Data Persistence

Docker volumes ensure data survives container restarts:
- `mysql_data` - Database persistence
- `redis_data` - Cache persistence (optional)

---

## 🛠️ Manual Setup (Without Docker)

If you prefer to run services locally:

### Prerequisites
- Java 17+
- Maven
- Node.js & npm
- MySQL
- Redis

### Backend Setup
```bash
cd Backend/apilimiter
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend/apilimiter
npm install
npm run dev
```

### Database Setup
Create database:
```sql
CREATE DATABASE apilimiter;
```

Spring Boot will auto-create tables on first run.

---

## 📘 API Documentation (Swagger)

Interactive API documentation available at:
```
http://localhost:8080/swagger-ui/index.html
```

**Features:**
- Test all endpoints
- View request/response schemas
- JWT authentication support

---

## 🎯 Why This Project?

This project demonstrates:
- Real-world backend system design
- Secure API exposure using API keys
- Distributed rate limiting at scale
- Analytics & observability
- Clean architecture and testable code
- Modern DevOps practices (Docker, containerization)

---

## ⭐ Future Improvements

- [ ] Role-based access control (RBAC)
- [ ] API key rotation and expiration
- [ ] Webhook support for events
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] API versioning
- [ ] Request response caching
- [ ] Rate limit customization per API key

---

## 🧑‍💻 Author

**Harshit Singh**  
Backend Developer

**Skills:** Java | Spring Boot | Redis | React | Docker  
**Focus:** Scalable and secure backend systems


---

## 📄 License

This project is for learning and demonstration purposes.

---
