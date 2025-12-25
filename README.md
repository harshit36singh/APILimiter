# 🚀 API Limiter Platform

A full-stack API management and rate-limiting platform that allows developers to securely expose APIs, generate API keys, enforce distributed rate limits, and track real-time usage analytics.

Built with **Spring Boot + Redis + MySQL** on the backend and **React** on the frontend.

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Redis](https://img.shields.io/badge/Redis-7.x-red.svg)](https://redis.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-blue.svg)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg)](https://www.docker.com/)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Quick Start](#️-quick-start-with-docker-recommended)
- [Configuration](#️-configuration)
- [API Flow](#-api-flow-overview)
- [Analytics Endpoints](#-analytics-endpoints)
- [Testing](#-running-tests)
- [API Documentation](#-api-documentation-swagger)
- [Future Improvements](#-future-improvements)

---

## 📌 Features

### 🔐 Authentication & Security
- JWT-based user authentication
- Secure login & registration
- Spring Security with custom JWT filter
- Role separation between API owners and API consumers
- Password encryption using BCrypt

### 🔑 API Key Management
- Generate unique API keys per project
- Enable / disable API keys
- API keys scoped strictly to projects
- Validation to prevent cross-project key usage
- API key prefix system (`apik_`)

### ⚡ Distributed Rate Limiting
- Redis-backed rate limiting using Bucket4j
- Per-API-key request limits
- Configurable rate limit windows
- Works across multiple application instances
- Real-time rate limit enforcement

### 📊 Usage Analytics & Logging
Logs every API request with:
- API key
- Project
- Timestamp
- Client IP
- Request metadata

Analytics endpoints for:
- Per-API-key usage
- Hourly usage (last 24 hours)
- Daily project usage reports
- Time-series data visualization

### 🌐 Public API Gateway
- Public endpoint for consuming protected APIs
- API key validation + rate limiting enforced
- Transparent proxy to user-defined API URLs
- HTTP method forwarding
- Request/response logging

### 🧪 Testing & Quality
- Unit tests with JUnit 5 & Mockito
- Service-level testing for business logic
- Clean Maven dependency management
- Swagger (OpenAPI) documentation
- Code coverage reports

---

## 🧱 Tech Stack

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.x** - Application framework
- **Spring Security** - Authentication & authorization (JWT)
- **Spring Data JPA** - Database ORM (Hibernate)
- **MySQL 8.x** - Relational database
- **Redis 7.x** - In-memory data store for rate limiting
- **Bucket4j** - Rate limiting library
- **ModelMapper** - DTO mapping
- **Swagger / OpenAPI 3** - API documentation
- **JUnit 5 & Mockito** - Testing framework
- **Maven** - Build tool

### Frontend
- **React 18.x** - UI library
- **Vite** - Build tool & dev server
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **JWT Decode** - Token management
- **Modern ES6+ JavaScript**

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Git** - Version control

---

## 🧠 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│                    (React Frontend - Port 5173)                  │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/REST + JWT
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Spring Boot Backend (Port 8080)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Auth Service │  │Project Service│  │APIKey Service│          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │Rate Limiter  │  │ Analytics    │  │Gateway Service│          │
│  │  (Bucket4j)  │  │   Service    │  │   (Proxy)    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└───────────┬──────────────────────┬──────────────────────────────┘
            │                      │
     ┌──────▼──────┐        ┌─────▼──────┐
     │   Redis     │        │   MySQL    │
     │ Rate Limits │        │  Metadata  │
     │(Port 6379)  │        │(Port 3306) │
     └─────────────┘        └────────────┘
```

**Data Flow:**
1. User authenticates → JWT token issued
2. User creates project → Project stored in MySQL
3. User generates API key → Key stored in MySQL
4. External client calls gateway → Key validated → Rate limit checked (Redis)
5. Request proxied to target API → Response returned
6. Request logged to MySQL → Analytics updated

---

## 📂 Project Structure

```
APILimiter/
│
├── Backend/
│   └── apilimiter/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/example/apilimiter/
│       │   │   │   ├── config/
│       │   │   │   │   ├── BeanConfig.java              # Application beans
│       │   │   │   │   ├── RedisConfig.java             # Redis configuration
│       │   │   │   │   ├── SecurityConfig.java          # Security & JWT setup
│       │   │   │   │   └── SwaggerConfig.java           # API documentation config
│       │   │   │   │
│       │   │   │   ├── controller/
│       │   │   │   │   ├── ApiKeyController.java        # API key management endpoints
│       │   │   │   │   ├── AuthController.java          # Authentication endpoints
│       │   │   │   │   ├── GatewayController.java       # Public API gateway
│       │   │   │   │   ├── ProjectController.java       # Project CRUD endpoints
│       │   │   │   │   └── UsageController.java         # Analytics endpoints
│       │   │   │   │
│       │   │   │   ├── dto/
│       │   │   │   │   ├── ApiKeyDTO.java               # API key data transfer object
│       │   │   │   │   ├── ApiKeyRequestDTO.java        # API key creation request
│       │   │   │   │   ├── ApiKeyUpdateDTO.java         # API key update request
│       │   │   │   │   ├── JwtAuthResponse.java         # JWT response wrapper
│       │   │   │   │   ├── LoginDTO.java                # Login credentials
│       │   │   │   │   ├── ProjectDTO.java              # Project data transfer object
│       │   │   │   │   ├── ProjectRequestDTO.java       # Project creation request
│       │   │   │   │   ├── RegisterDTO.java             # User registration data
│       │   │   │   │   └── UsageDTO.java                # Usage statistics
│       │   │   │   │
│       │   │   │   ├── entities/
│       │   │   │   │   ├── ApiKey.java                  # API key entity (JPA)
│       │   │   │   │   ├── Project.java                 # Project entity (JPA)
│       │   │   │   │   ├── RequestLog.java              # Request log entity (JPA)
│       │   │   │   │   └── User.java                    # User entity (JPA)
│       │   │   │   │
│       │   │   │   ├── repository/
│       │   │   │   │   ├── ApiKeyRepository.java        # API key data access
│       │   │   │   │   ├── ProjectRepository.java       # Project data access
│       │   │   │   │   ├── RequestLogRepository.java    # Request log data access
│       │   │   │   │   └── UserRepository.java          # User data access
│       │   │   │   │
│       │   │   │   ├── security/
│       │   │   │   │   ├── CustomUserDetailsService.java # User loading service
│       │   │   │   │   ├── JwtAuthenticationEntryPoint.java # JWT error handler
│       │   │   │   │   ├── JwtAuthenticationFilter.java # JWT request filter
│       │   │   │   │   └── JwtTokenProvider.java        # JWT token utilities
│       │   │   │   │
│       │   │   │   ├── service/
│       │   │   │   │   ├── impl/
│       │   │   │   │   │   ├── ApiKeyServiceImpl.java   # API key business logic
│       │   │   │   │   │   ├── AuthServiceImpl.java     # Authentication logic
│       │   │   │   │   │   ├── ProjectServiceImpl.java  # Project business logic
│       │   │   │   │   │   ├── RateLimitServiceImpl.java # Rate limiting logic
│       │   │   │   │   │   └── UsageServiceImpl.java    # Analytics logic
│       │   │   │   │   │
│       │   │   │   │   ├── ApiKeyService.java           # API key service interface
│       │   │   │   │   ├── AuthService.java             # Authentication interface
│       │   │   │   │   ├── ProjectService.java          # Project service interface
│       │   │   │   │   ├── RateLimitService.java        # Rate limit interface
│       │   │   │   │   └── UsageService.java            # Analytics interface
│       │   │   │   │
│       │   │   │   ├── util/
│       │   │   │   │   └── ApiKeyGenerator.java         # API key generation utility
│       │   │   │   │
│       │   │   │   └── ApilimiterApplication.java       # Spring Boot main class
│       │   │   │
│       │   │   └── resources/
│       │   │       ├── application.properties            # Default configuration
│       │   │       └── application-docker.properties     # Docker environment config
│       │   │
│       │   └── test/
│       │       └── java/com/example/apilimiter/
│       │           ├── service/
│       │           │   ├── ApiKeyServiceTest.java        # API key service tests
│       │           │   ├── AuthServiceTest.java          # Auth service tests
│       │           │   ├── ProjectServiceTest.java       # Project service tests
│       │           │   └── RateLimitServiceTest.java     # Rate limit tests
│       │           │
│       │           └── ApilimiterApplicationTests.java   # Application tests
│       │
│       ├── target/                                       # Maven build output
│       ├── .gitignore
│       ├── Dockerfile                                    # Backend container config
│       ├── HELP.md
│       ├── mvnw                                          # Maven wrapper (Unix)
│       ├── mvnw.cmd                                      # Maven wrapper (Windows)
│       └── pom.xml                                       # Maven dependencies
│
├── Frontend/
│   └── apilimiter/
│       ├── public/                                       # Static assets
│       │   └── vite.svg
│       │
│       ├── src/
│       │   ├── components/                               # React components
│       │   │   ├── analytics/
│       │   │   │   ├── ApiKeyUsage.jsx                  # API key usage chart
│       │   │   │   ├── HourlyUsage.jsx                  # Hourly usage visualization
│       │   │   │   └── ProjectAnalytics.jsx             # Project analytics dashboard
│       │   │   │
│       │   │   ├── apikeys/
│       │   │   │   ├── ApiKeyList.jsx                   # List of API keys
│       │   │   │   ├── CreateApiKey.jsx                 # API key creation form
│       │   │   │   └── ApiKeyDetails.jsx                # API key detail view
│       │   │   │
│       │   │   ├── auth/
│       │   │   │   ├── Login.jsx                        # Login form component
│       │   │   │   ├── Register.jsx                     # Registration form
│       │   │   │   └── ProtectedRoute.jsx               # Route guard
│       │   │   │
│       │   │   ├── common/
│       │   │   │   ├── Header.jsx                       # App header/navbar
│       │   │   │   ├── Footer.jsx                       # App footer
│       │   │   │   ├── Loader.jsx                       # Loading spinner
│       │   │   │   └── ErrorBoundary.jsx                # Error handling
│       │   │   │
│       │   │   ├── projects/
│       │   │   │   ├── ProjectList.jsx                  # List of projects
│       │   │   │   ├── CreateProject.jsx                # Project creation form
│       │   │   │   ├── ProjectDetails.jsx               # Project detail view
│       │   │   │   └── EditProject.jsx                  # Project edit form
│       │   │   │
│       │   │   └── dashboard/
│       │   │       └── Dashboard.jsx                    # Main dashboard
│       │   │
│       │   ├── services/
│       │   │   ├── api.js                               # Axios instance configuration
│       │   │   ├── authService.js                       # Authentication API calls
│       │   │   ├── projectService.js                    # Project API calls
│       │   │   ├── apiKeyService.js                     # API key API calls
│       │   │   └── analyticsService.js                  # Analytics API calls
│       │   │
│       │   ├── utils/
│       │   │   ├── auth.js                              # Auth helper functions
│       │   │   ├── constants.js                         # App constants
│       │   │   └── validators.js                        # Form validators
│       │   │
│       │   ├── styles/
│       │   │   ├── App.css                              # Global styles
│       │   │   ├── Dashboard.css                        # Dashboard styles
│       │   │   └── components/                          # Component-specific styles
│       │   │
│       │   ├── App.jsx                                  # Root component
│       │   ├── main.jsx                                 # Application entry point
│       │   └── index.css                                # Base CSS
│       │
│       ├── .gitignore
│       ├── Dockerfile                                    # Frontend container config
│       ├── eslint.config.js                             # ESLint configuration
│       ├── index.html                                   # HTML template
│       ├── package.json                                 # npm dependencies
│       ├── package-lock.json                            # npm lock file
│       ├── README.md                                    # Frontend documentation
│       └── vite.config.js                               # Vite build configuration
│
├── .gitignore                                            # Root gitignore
├── docker-compose.yml                                    # Multi-container orchestration
└── README.md                                             # Project documentation (this file)
```

---

## ▶️ Quick Start with Docker (Recommended)

### 1️⃣ Prerequisites
- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)

That's it! No need to install Java, Maven, Node.js, MySQL, or Redis locally.

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/harshit36singh/APILimiter.git
cd APILimiter
```

### 3️⃣ Build Backend JAR (One Time)

```bash
cd Backend/apilimiter
mvn clean package -DskipTests
cd ../../
```

> **Note:** This creates the executable JAR file needed for the Docker container.

### 4️⃣ Start Everything

```bash
docker-compose up --build
```

This starts:
- ✅ MySQL (persistent data storage)
- ✅ Redis (rate limiting cache)
- ✅ Spring Boot backend
- ✅ React frontend (dev mode)

**First-time startup may take 2-3 minutes** as Docker downloads images and builds containers.

### 🌐 Access the Application

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | React UI |
| Backend API | http://localhost:8080 | REST API |
| Health Check | http://localhost:8080/actuator/health | Service status |
| Swagger UI | http://localhost:8080/swagger-ui/index.html | API docs |

### 🛑 Stop Everything

```bash
# Stop containers (keeps data)
docker-compose down

# Stop and remove all data
docker-compose down -v
```

---

## ⚙️ Configuration

### Docker Environment (Default)

The backend uses Spring profiles for environment-specific configuration:

- `application.properties` → Local development
- `application-docker.properties` → Docker environment (active by default)

Docker automatically activates the Docker profile via:

```yaml
environment:
  SPRING_PROFILES_ACTIVE: docker
```

### Backend Configuration (`application-docker.properties`)

```properties
# Database
spring.datasource.url=jdbc:mysql://mysql:3306/apilimiter
spring.datasource.username=root
spring.datasource.password=password

# Redis
spring.redis.host=redis
spring.redis.port=6379

# JWT
jwt.secretkey=${JWT_SECRET_KEY}
jwt.expiration=86400000

# Server
server.port=8080
```

### Local Development Configuration

For running without Docker, update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/apilimiter
spring.datasource.username=root
spring.datasource.password=your_password

spring.redis.host=localhost
spring.redis.port=6379

jwt.secretkey=your-secret-key-here
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SPRING_PROFILES_ACTIVE` | Active Spring profile | `docker` |
| `JWT_SECRET_KEY` | JWT signing key | Set in docker-compose.yml |
| `MYSQL_ROOT_PASSWORD` | MySQL root password | `password` |
| `MYSQL_DATABASE` | Database name | `apilimiter` |

---

## 🔑 API Flow Overview

### 1️⃣ User Authentication

**Register a new user:**
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Login:**
```http
POST /auth/login
Content-Type: application/json

{
  "usernameOrEmail": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer"
}
```

### 2️⃣ Project Management

**Create a project:**
```http
POST /projects
Authorization: Bearer {jwt-token}
Content-Type: application/json

{
  "name": "My API",
  "shortName": "myapi",
  "description": "My awesome API",
  "targetUrl": "https://api.example.com"
}
```

**Get user projects:**
```http
GET /projects
Authorization: Bearer {jwt-token}
```

### 3️⃣ API Key Generation

**Generate API key:**
```http
POST /apikeys
Authorization: Bearer {jwt-token}
Content-Type: application/json

{
  "projectId": 1,
  "name": "Production Key",
  "rateLimit": 100
}
```

**Response:**
```json
{
  "id": 1,
  "key": "apik_a1b2c3d4e5f6g7h8i9j0",
  "name": "Production Key",
  "isActive": true,
  "rateLimit": 100,
  "createdAt": "2025-12-25T10:30:00"
}
```

### 4️⃣ Public API Consumption

External clients can now call your API through the gateway:

```http
GET /apilimiter/{projectShortName}/your-endpoint
Authorization: apik_a1b2c3d4e5f6g7h8i9j0
```

**Request Flow:**
1. ✅ API key validated against database
2. ✅ Rate limit checked in Redis (Bucket4j)
3. ✅ Request logged to MySQL
4. ✅ Request proxied to `targetUrl`
5. ✅ Response returned to client

**Example:**
```bash
curl -X GET "http://localhost:8080/apilimiter/myapi/users" \
  -H "Authorization: apik_a1b2c3d4e5f6g7h8i9j0"
```

---

## 📊 Analytics Endpoints

### Per API Key Usage

Get total request count for an API key:

```http
GET /usage/{projectShortName}
Authorization: Bearer {jwt-token}
```

**Response:**
```json
{
  "apiKeyName": "Production Key",
  "totalRequests": 15423,
  "projectName": "My API"
}
```

### Hourly Usage (Last 24 Hours)

Get hourly request breakdown:

```http
GET /usagegraph/apikey/24/{apiKeyId}
Authorization: Bearer {jwt-token}
```

**Response:**
```json
[
  { "hour": "2025-12-25T00:00:00", "count": 234 },
  { "hour": "2025-12-25T01:00:00", "count": 189 },
  { "hour": "2025-12-25T02:00:00", "count": 156 }
]
```

### Daily Project Usage

Get daily usage for a project:

```http
GET /usagegraph/project/daily/{projectId}
Authorization: Bearer {jwt-token}
```

**Response:**
```json
[
  { "date": "2025-12-20", "count": 5432 },
  { "date": "2025-12-21", "count": 6123 },
  { "date": "2025-12-22", "count": 5876 }
]
```

---

## 🧪 Running Tests

### Backend Tests

```bash
cd Backend/apilimiter
mvn clean test
```

**Test Coverage Includes:**
- ✅ Unit tests for all service layers
- ✅ Mockito-based isolation tests
- ✅ Repository tests with H2 in-memory database
- ✅ Controller integration tests
- ✅ Security configuration tests

### View Test Reports

```bash
mvn surefire-report:report
open target/site/surefire-report.html
```

---

## 🐳 Docker Architecture

### Service Dependencies

```
┌─────────────────────────────────────────────────────┐
│                  Docker Network                      │
│                                                      │
│  ┌─────────┐    ┌──────────┐    ┌──────────┐      │
│  │  MySQL  │◄───┤  Backend ├───►│  Redis   │      │
│  │  :3306  │    │  :8080   │    │  :6379   │      │
│  └─────────┘    └────▲─────┘    └──────────┘      │
│                      │                              │
│                 ┌────▼──────┐                       │
│                 │  Frontend │                       │
│                 │   :5173   │                       │
│                 └───────────┘                       │
└─────────────────────────────────────────────────────┘
```

### Volume Persistence

Docker volumes ensure data survives container restarts:

- `mysql_data` → Database files (persistent)
- `redis_data` → Cache data (optional persistence)

### Container Details

| Container | Image | Port | Purpose |
|-----------|-------|------|---------|
| backend | Java 17 + Maven | 8080 | Spring Boot API |
| frontend | Node 20 + Vite | 5173 | React UI |
| mysql | MySQL 8.0 | 3306 | Database |
| redis | Redis 7.2 | 6379 | Cache |

---

## 🛠️ Manual Setup (Without Docker)

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+ & npm
- MySQL 8.0+
- Redis 7.0+

### 1️⃣ Database Setup

Create database:
```sql
CREATE DATABASE apilimiter;
CREATE USER 'apilimiter_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON apilimiter.* TO 'apilimiter_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2️⃣ Backend Setup

```bash
cd Backend/apilimiter
mvn clean install
mvn spring-boot:run
```

### 3️⃣ Frontend Setup

```bash
cd Frontend/apilimiter
npm install
npm run dev
```

### 4️⃣ Verify Services

- Backend: http://localhost:8080/actuator/health
- Frontend: http://localhost:5173

---

## 📘 API Documentation (Swagger)

Interactive API documentation available at:

**http://localhost:8080/swagger-ui/index.html**

**Features:**
- 🔍 Explore all endpoints
- 🧪 Test API calls directly
- 📝 View request/response schemas
- 🔐 JWT authentication support
- 📋 Auto-generated from code annotations

---

## 🎯 Why This Project?

This project demonstrates:

- ✅ **Real-world system design** - Scalable microservices architecture
- ✅ **Distributed rate limiting** - Redis + Bucket4j for high performance
- ✅ **Security best practices** - JWT authentication, API key management
- ✅ **Observability** - Comprehensive logging and analytics
- ✅ **Clean architecture** - Separation of concerns, testable code
- ✅ **Modern DevOps** - Docker containerization, docker-compose orchestration
- ✅ **Production-ready patterns** - Error handling, validation, monitoring

---

## ⭐ Future Improvements

- [ ] **Role-based access control (RBAC)** - Admin, Developer, Viewer roles
- [ ] **API key rotation** - Automatic key expiration and rotation
- [ ] **Webhook support** - Event notifications (key usage, rate limits)
- [ ] **CI/CD pipeline** - GitHub Actions for automated testing and deployment
- [ ] **API versioning** - Support multiple API versions
- [ ] **Request/response caching** - Cache frequently accessed data
- [ ] **Custom rate limit tiers** - Bronze, Silver, Gold API key tiers
- [ ] **Geo-based rate limiting** - Different limits per region
- [ ] **Real-time monitoring dashboard** - Live usage graphs with WebSockets
- [ ] **API usage billing** - Monetization and payment integration
- [ ] **Multi-tenancy** - Organizational accounts with team management
- [ ] **Audit logs** - Complete history of all configuration changes

---

## 🧑‍💻 Author

**Harshit Singh**  
Backend Developer | Full-Stack Engineer

**Skills:** Java | Spring Boot | Redis | React | Docker | Microservices  
**Focus:** Scalable and secure backend systems

---


