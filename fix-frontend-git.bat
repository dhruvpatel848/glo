@echo off
echo ========================================
echo   Fixing Frontend Git Issue
echo ========================================
echo.

echo This will remove the nested .git folder from frontend
echo so all frontend code can be added to the main repository.
echo.

set /p continue="Continue? (y/n): "
if /i not "%continue%"=="y" (
    echo Operation cancelled.
    pause
    exit /b
)

echo.
echo Step 1: Removing frontend\.git folder...
if exist "frontend\.git" (
    rmdir /s /q "frontend\.git"
    echo [OK] Removed frontend\.git
) else (
    echo [INFO] frontend\.git not found
)

echo.
echo Step 2: Removing frontend from Git cache...
git rm -r --cached frontend 2>nul

echo.
echo Step 3: Re-adding frontend folder...
git add frontend/

echo.
echo Step 4: Checking status...
git status

echo.
echo ========================================
echo   Fixed! Frontend is now ready
echo ========================================
echo.
echo Next steps:
echo 1. git commit -m "Add frontend code"
echo 2. git push
echo.

pause
