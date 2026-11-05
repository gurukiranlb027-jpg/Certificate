@echo off
title AARAMBH 2K26 - Certificate Generator
echo ========================================================
echo   AARAMBH 2K26 - Certificate Generator & Email Sender
echo ========================================================
echo.

:: Check if server is running on port 5000
netstat -ano | findstr ":5000" >nul
if %ERRORLEVEL% neq 0 (
    echo [INFO] Starting background Email Server on http://127.0.0.1:5000 ...
    start "AARAMBH Email Server" /min python "%~dp0email_server.py"
    timeout /t 2 /nobreak >nul
) else (
    echo [OK] Email Server is already running on port 5000.
)

echo [OK] Opening Certificate Generator in browser...
start "" "http://127.0.0.1:5000"
exit
