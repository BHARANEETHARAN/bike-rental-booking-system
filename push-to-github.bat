@echo off
REM Push Bike Rental Booking System to GitHub
REM This script will initialize git, commit files, and push to your GitHub account

echo.
echo ====================================
echo Push to GitHub - Step by Step
echo ====================================
echo.

REM Step 1: Configure Git
echo [Step 1/5] Configuring Git...
git config --global user.name "Bharaneetharan"
git config --global user.email "bharanipt2006@gmail.com"
echo Git configured with your name and email.
echo.

REM Step 2: Initialize repository
echo [Step 2/5] Initializing Git repository...
if exist .git (
    echo Git repository already initialized.
) else (
    git init
    echo Repository initialized.
)
echo.

REM Step 3: Stage all files
echo [Step 3/5] Staging all files...
git add .
echo Files staged for commit.
echo.

REM Step 4: Create initial commit
echo [Step 4/5] Creating initial commit...
git commit -m "Initial commit - Bike Rental Booking System with full-stack features (frontend + backend)"
echo Commit created.
echo.

REM Step 5: Add remote and push
echo [Step 5/5] Adding remote and pushing to GitHub...
echo.
echo *** IMPORTANT: Before proceeding, create a GitHub repository ***
echo 1. Go to: https://github.com/new
echo 2. Create a new repository named: bike-rental-booking-system
echo 3. Do NOT initialize with README (we already have files)
echo 4. Copy the repository URL (HTTPS)
echo.
echo When ready, paste the repository URL and press Enter.
echo Example: https://github.com/BHARANEETHARAN/bike-rental-booking-system.git
echo.

set /p REPO_URL="Enter your GitHub repository URL: "

if "%REPO_URL%"=="" (
    echo Error: Repository URL is required.
    pause
    exit /b 1
)

echo.
echo Adding remote: %REPO_URL%
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
echo Remote added.
echo.

echo Renaming branch to 'main'...
git branch -M main
echo.

echo Pushing to GitHub...
echo Please enter your GitHub credentials when prompted.
echo (If you have 2FA enabled, use a Personal Access Token as password)
echo.
git push -u origin main

echo.
echo ====================================
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS! Your project has been pushed to GitHub!
    echo Repository: %REPO_URL%
) else (
    echo ERROR: Push failed. Please check your URL and credentials.
)
echo ====================================
echo.
pause
