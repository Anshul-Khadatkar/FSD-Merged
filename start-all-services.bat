@echo off
echo 🚀 Starting Complete Microservices System
echo ==========================================
echo.

echo 📋 System Overview:
echo   - Registration Service (Port 8080, Frontend 4200)
echo   - Participation Service (Port 8081, Frontend 4201) 
echo   - Result Service (Port 5005, Frontend 4202)
echo   - PostgreSQL Database (Port 5432)
echo.

echo 🔧 Prerequisites:
echo   - Java 17+ installed
echo   - Node.js and Angular CLI installed
echo   - PostgreSQL running on port 5432
echo   - All services will be accessible and integrated
echo.

echo ⏳ Starting services...
echo.

echo 📋 Starting Registration Service Frontend...
start "Registration Frontend" cmd /k "cd 1_Registration\fsd-frontend && npm install && ng serve --port 4200"

echo ⏳ Waiting 5 seconds...
timeout /t 5 /nobreak >nul

echo 📋 Starting Participation Service Frontend...
start "Participation Frontend" cmd /k "cd 2_Participation\frontend && npm install && ng serve --port 4201"

echo ⏳ Waiting 5 seconds...
timeout /t 5 /nobreak >nul

echo 📋 Starting Result Service Frontend...
start "Result Frontend" cmd /k "cd 3_Result\Frontend && npm install && ng serve --port 4202"

echo ⏳ Waiting 5 seconds...
timeout /t 5 /nobreak >nul

echo 📋 Starting Registration Service Backend...
start "Registration Backend" cmd /k "cd 1_Registration\fsd && ./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8080"

echo ⏳ Waiting 10 seconds...
timeout /t 10 /nobreak >nul

echo 📋 Starting Participation Service Backend...
start "Participation Backend" cmd /k "cd 2_Participation\backend && ./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081"

echo ⏳ Waiting 10 seconds...
timeout /t 10 /nobreak >nul

echo 📋 Starting Result Service Backend...
start "Result Backend" cmd /k "cd 3_Result\Backend && ./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=5005"

echo.
echo 🎉 All services are starting!
echo.

echo 📊 Service URLs:
echo   Main Entry Point (Registration): http://localhost:4200
echo   Participation & Feedback Form: http://localhost:4201
echo   Result & Analytics Dashboard: http://localhost:4202
echo   Registration API: http://localhost:8080
echo   Participation API: http://localhost:8081
echo   Result API: http://localhost:5005
echo.

echo 👤 Complete User Flow:
echo   1. Go to http://localhost:4200 (Registration)
echo   2. New users: Click "New User? Register" → Fill form → Login
echo   3. Existing users: Click "Already Registered? Login"
echo   4. After login: Automatically redirected to participation form
echo   5. Fill participation form (username pre-filled) → Submit
echo   6. View results and analytics at http://localhost:4202
echo.

echo 🔄 Integration Features:
echo   ✅ Seamless user flow across all services
echo   ✅ Automatic redirection between services
echo   ✅ Shared authentication and user data
echo   ✅ Real-time result tracking and analytics
echo   ✅ Cross-service communication
echo.

echo ⚠️ Note: Services may take a few minutes to fully start
echo 💡 Check the individual terminal windows for startup progress
echo 🛑 To stop all services: Press Ctrl+C in each terminal window
echo.

pause

