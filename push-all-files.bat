@echo off
REM Auto-find Git and push to GitHub
REM This script will locate Git and push your project

setlocal enabledelayedexpansion

REM Try to find Git in common locations
set GIT_PATH=
if exist "C:\Program Files\Git\bin\git.exe" set GIT_PATH=C:\Program Files\Git\bin\git.exe
if exist "C:\Program Files (x86)\Git\bin\git.exe" set GIT_PATH=C:\Program Files (x86)\Git\bin\git.exe
if exist "%PROGRAMFILES%\Git\bin\git.exe" set GIT_PATH=%PROGRAMFILES%\Git\bin\git.exe

if "!GIT_PATH!"=="" (
    echo Git not found in common locations.
    echo Please add Git to PATH or install it from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Found Git at: !GIT_PATH!
echo.

REM Use the full path to git
set GIT="!GIT_PATH!"

echo ====================================
echo Push to GitHub - All Files
echo ====================================
echo.

REM Step 1: Initialize
echo [Step 1] Initializing repository...
%GIT% init
echo.

REM Step 2: Configure
echo [Step 2] Configuring git user...
%GIT% config user.name "Bharaneetharan"
%GIT% config user.email "bharanipt2006@gmail.com"
echo.

REM Step 3: Add all files
echo [Step 3] Adding all files...
%GIT% add .
echo.

REM Step 4: Commit
echo [Step 4] Creating commit...
%GIT% commit -m "Initial commit - Bike Rental Booking System with full-stack features"
echo.

REM Step 5: Rename to main
echo [Step 5] Setting up main branch...
%GIT% branch -M main
echo.

REM Step 6: Add remote
echo [Step 6] Adding GitHub remote...
%GIT% remote remove origin >nul 2>&1
%GIT% remote add origin https://github.com/BHARANEETHARAN/bike-rental-booking-system.git
echo.

REM Step 7: Push
echo [Step 7] Pushing to GitHub...
echo Please enter your GitHub credentials when prompted.
echo (If 2FA enabled, use a Personal Access Token as password)
echo.
%GIT% push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ====================================
    echo SUCCESS! Files pushed to GitHub!
    echo Repository: https://github.com/BHARANEETHARAN/bike-rental-booking-system
    echo ====================================
) else (
    echo ====================================
    echo ERROR: Push failed. Check your GitHub URL and credentials.
    echo ====================================
)
echo.
pause
