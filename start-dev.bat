@echo off
echo Starting Next.js Development Server...
echo.
echo This will:
echo 1. Kill any existing Node.js processes
echo 2. Clear the .next cache
echo 3. Start the development server
echo.
echo Press any key to continue...
pause >nul

echo.
echo Killing existing Node.js processes...
taskkill /F /IM node.exe 2>nul

echo.
echo Clearing .next cache...
if exist .next rmdir /s /q .next

echo.
echo Installing dependencies...
npm install

echo.
echo Starting development server...
echo.
echo The server will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
npm run dev
