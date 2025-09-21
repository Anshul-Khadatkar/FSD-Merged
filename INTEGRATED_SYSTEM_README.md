# Complete Microservices System - Registration, Participation & Results

This is a comprehensive microservices system that includes Registration, Participation, and Results services with full integration and port redirection.

## 🏗️ System Architecture

### Services Overview
- **Registration Service**: User registration and authentication (Port 8080, Frontend 4200)
- **Participation Service**: Event participation and feedback forms (Port 8081, Frontend 4201)
- **Result Service**: Analytics, results tracking, and reporting (Port 5005, Frontend 4202)
- **PostgreSQL Database**: Shared database for all services (Port 5432)

### Port Configuration
| Service | Backend Port | Frontend Port | Purpose |
|---------|-------------|---------------|---------|
| Registration | 8080 | 4200 | User management and authentication |
| Participation | 8081 | 4201 | Event participation and feedback |
| Results | 5005 | 4202 | Analytics and result tracking |

## 🚀 Quick Start

### Prerequisites
- Java 17+ installed
- Node.js and Angular CLI installed
- PostgreSQL running on port 5432
- Maven installed

### Option 1: Start All Services (Recommended)
```bash
# Run the comprehensive startup script
start-all-services.bat
```

### Option 2: Start Individual Services
```bash
# Start Registration Service
cd 1_Registration/fsd-frontend && npm install && ng serve --port 4200
cd 1_Registration/fsd && ./mvnw spring-boot:run --server.port=8080

# Start Participation Service
cd 2_Participation/frontend && npm install && ng serve --port 4201
cd 2_Participation/backend && ./mvnw spring-boot:run --server.port=8081

# Start Result Service
cd 3_Result/Frontend && npm install && ng serve --port 4202
cd 3_Result/Backend && ./mvnw spring-boot:run --server.port=5005
```

## 🔄 User Flow

1. **Registration** (http://localhost:4200)
   - New users: Click "New User? Register" → Fill form → Login
   - Existing users: Click "Already Registered? Login"

2. **Participation** (http://localhost:4201)
   - After login: Automatically redirected to participation form
   - Fill participation form (username pre-filled) → Submit

3. **Results** (http://localhost:4202)
   - View results and analytics
   - Track participation data
   - Generate reports

## 🔧 Configuration

### Database Configuration
All services use the same PostgreSQL database (`participationdb`) for seamless data sharing:
- Host: localhost
- Port: 5432
- Database: participationdb
- Username: postgres
- Password: root

### CORS Configuration
All services are configured with CORS to allow cross-origin requests:
- Origins: http://localhost:4200, http://localhost:4201, http://localhost:4202
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Headers: All headers allowed

## 🐳 Docker Support

### Using Docker Compose
```bash
cd integration-config
docker-compose up -d
```

This will start all services in Docker containers with proper networking.

### Individual Docker Builds
```bash
# Build Result Service
cd 3_Result/Backend
docker build -t result-service .

# Build Result Frontend
cd 3_Result/Frontend
docker build -t result-frontend .
```

## 🧪 Testing

### Test All Services
```bash
test-all-services.bat
```

This script will test all backend APIs and display their status.

### Manual Testing
- Registration API: http://localhost:8080/api/auth/health
- Participation API: http://localhost:8081/api/participation/health
- Result API: http://localhost:5005/api/results/health

## 📁 Project Structure

```
FSD-Merged/
├── 1_Registration/          # Registration service
│   ├── fsd/                # Backend (Spring Boot)
│   └── fsd-frontend/       # Frontend (Angular)
├── 2_Participation/        # Participation service
│   ├── backend/            # Backend (Spring Boot)
│   └── frontend/           # Frontend (Angular)
├── 3_Result/               # Result service
│   ├── Backend/            # Backend (Spring Boot)
│   └── Frontend/           # Frontend (Angular)
├── integration-config/     # Docker configuration
├── start-all-services.bat  # Complete system startup
├── start-system.bat        # Updated system startup
└── test-all-services.bat   # Service testing
```

## 🔄 Integration Features

- **Seamless User Flow**: Users can navigate between all services without re-authentication
- **Automatic Redirection**: Smart redirection between services based on user actions
- **Shared Authentication**: JWT tokens work across all services
- **Real-time Data**: All services share the same database for consistent data
- **Cross-service Communication**: Services can communicate with each other
- **Port Redirection**: Proper proxy configuration for frontend-backend communication

## 🛠️ Troubleshooting

### Common Issues
1. **Port Conflicts**: Ensure no other services are using ports 4200, 4201, 4202, 8080, 8081, 5005
2. **Database Connection**: Verify PostgreSQL is running on port 5432
3. **CORS Errors**: Check that all services are running on the correct ports
4. **Service Dependencies**: Start services in the correct order (database → backends → frontends)

### Logs
- Check individual terminal windows for service-specific logs
- Backend logs show database connections and API calls
- Frontend logs show compilation and serving status

## 📊 Monitoring

### Service Health Checks
- Registration: http://localhost:8080/api/auth/health
- Participation: http://localhost:8081/api/participation/health
- Results: http://localhost:5005/api/results/health

### Frontend Access
- Registration: http://localhost:4200
- Participation: http://localhost:4201
- Results: http://localhost:4202

## 🎯 Features

### Registration Service
- User registration and login
- JWT-based authentication
- User profile management
- Automatic redirection to participation

### Participation Service
- Event participation forms
- Feedback collection
- User data integration
- Automatic redirection to results

### Result Service
- Analytics dashboard
- Result tracking and reporting
- Data visualization
- Cross-service data integration

## 🔐 Security

- JWT-based authentication across all services
- CORS configuration for secure cross-origin requests
- Password encryption using BCrypt
- Secure session management

## 📝 Notes

- All services are configured to work together seamlessly
- Port redirection is properly configured for all frontend-backend communication
- The system supports both local development and Docker deployment
- Database schema is automatically created and updated
- All services share the same database for data consistency

