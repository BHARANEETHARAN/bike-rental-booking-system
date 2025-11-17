@echo off
setlocal enabledelayedexpansion

REM Find Git
if exist "C:\Program Files\Git\bin\git.exe" (
    set "GIT_PATH=C:\Program Files\Git\bin\git.exe"
) else if exist "C:\Program Files (x86)\Git\bin\git.exe" (
    set "GIT_PATH=C:\Program Files (x86)\Git\bin\git.exe"
) else (
    echo Git not found!
    exit /b 1
)

echo Found Git at: %GIT_PATH%
echo.

cd /d "%~dp0"

echo Removing .env from git tracking...
"%GIT_PATH%" rm --cached server\.env
if errorlevel 1 (
    echo Failed to remove .env from git
    exit /b 1
)

echo Committing changes...
"%GIT_PATH%" commit -m "Remove .env file with sensitive credentials from git tracking"
if errorlevel 1 (
    echo Failed to commit
    exit /b 1
)

echo Pushing to GitHub...
"%GIT_PATH%" push origin main
if errorlevel 1 (
    echo Failed to push
    exit /b 1
)

echo.
echo ====================================
echo SUCCESS! .env removed from GitHub
echo ====================================
