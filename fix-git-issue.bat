@echo off
echo ========================================
echo   Fixing Git Repository Issues
echo ========================================
echo.

echo This will remove nested .git folders from frontend and backend
echo.
set /p continue="Continue? (y/n): "
if /i not "%continue%"=="y" (
    echo Operation cancelled.
    pause
    exit /b
)

echo.
echo Removing nested .git folders...
echo.

REM Remove frontend .git folder
if exist "frontend\.git" (
    echo Removing frontend\.git...
    rmdir /s /q "frontend\.git"
    echo [OK] Removed frontend\.git
) else (
    echo [INFO] frontend\.git not found
)

REM Remove backend .git folder
if exist "backend\.git" (
    echo Removing backend\.git...
    rmdir /s /q "backend\.git"
    echo [OK] Removed backend\.git
) else (
    echo [INFO] backend\.git not found
)

echo.
echo Clearing Git cache...
git rm -r --cached frontend 2>nul
git rm -r --cached backend 2>nul

echo.
echo Re-adding files...
git add .

echo.
echo ========================================
echo   Fixed! Now you can commit and push
echo ========================================
echo.
echo Next steps:
echo 1. git commit -m "Initial commit"
echo 2. git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
echo 3. git push -u origin main
echo.

pause
