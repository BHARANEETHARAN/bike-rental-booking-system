@echo off
REM Final push to GitHub after conflict resolution

setlocal enabledelayedexpansion

REM Find Git
set GIT_PATH=
if exist "C:\Program Files\Git\bin\git.exe" set GIT_PATH=C:\Program Files\Git\bin\git.exe
if exist "C:\Program Files (x86)\Git\bin\git.exe" set GIT_PATH=C:\Program Files (x86)\Git\bin\git.exe

if "!GIT_PATH!"=="" (
    echo Git not found.
    pause
    exit /b 1
)

set GIT="!GIT_PATH!"

echo ====================================
echo Final Push to GitHub
echo ====================================
echo.

echo [Step 1] Adding resolved files...
%GIT% add .
echo.

echo [Step 2] Committing merge...
%GIT% commit -m "Resolve merge conflict and add all project files"
echo.

echo [Step 3] Pushing to GitHub...
%GIT% push -u origin main
echo.

echo ====================================
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS! Project is now live on GitHub!
    echo Repository: https://github.com/BHARANEETHARAN/bike-rental-booking-system
    echo.
    echo Next steps: Deploy to Vercel (frontend) and Render (backend)
) else (
    echo ERROR: Push failed. 
)
echo ====================================
echo.
pause
