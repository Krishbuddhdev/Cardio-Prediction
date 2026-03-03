@echo off
set NODE_OPTIONS=--no-deprecation
echo ============================================
echo Cardio Prediction - Starting Application
echo ============================================

echo.
echo [1/2] Starting Backend Server...
start "Backend Server" cmd /k "call conda activate cardio-ml && cd /d %~dp0backend && python app.py"

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo [2/2] Starting Frontend (npm start)...
cd /d %~dp0frontend
call npm start

echo.
echo Application closed.
pause