@echo off

:: Navigate to frontend directory
cd /d d:\reactjs\frontendCourse

:: Build React app
call npm.cmd run build

:: Copy dist files to Spring Boot project
xcopy /E /I /Y dist d:\stsworkspace\courses-management-system\src\main\resources\static

:: Clean up
pause
