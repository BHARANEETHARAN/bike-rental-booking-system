@echo off
REM Fix push conflict and sync with GitHub

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
echo Fix GitHub Push Conflict
echo ====================================
echo.

echo [Step 1] Pulling latest from GitHub...
%GIT% pull origin main --allow-unrelated-histories
echo.

echo [Step 2] Pushing all changes...
%GIT% push -u origin main
echo.

echo ====================================
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS! Your project is now on GitHub!
) else (
    echo ERROR: Push still failed. Try manual command:
    echo   git pull origin main --allow-unrelated-histories
    echo   git push -u origin main
)
echo ====================================
echo.
pause
