@echo off
echo 🧪 Testing All Microservices
echo =============================
echo.

echo ⏳ Testing Registration Service (Port 8080)...
curl -s -o nul -w "Registration API: %%{http_code}\n" http://localhost:8080/api/auth/health || echo Registration API: DOWN

echo ⏳ Testing Participation Service (Port 8081)...
curl -s -o nul -w "Participation API: %%{http_code}\n" http://localhost:8081/api/participation/health || echo Participation API: DOWN

echo ⏳ Testing Result Service (Port 5005)...
curl -s -o nul -w "Result API: %%{http_code}\n" http://localhost:5005/api/results/health || echo Result API: DOWN

echo.
echo 🌐 Frontend Services:
echo   Registration Frontend: http://localhost:4200
echo   Participation Frontend: http://localhost:4201
echo   Result Frontend: http://localhost:4202
echo.

echo 📊 Backend APIs:
echo   Registration API: http://localhost:8080
echo   Participation API: http://localhost:8081
echo   Result API: http://localhost:5005
echo.

echo ✅ Test completed! Check the HTTP status codes above.
echo   200 = Service is running
echo   DOWN = Service is not responding
echo.

pause

