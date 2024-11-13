@echo off
echo Generation in progress. Please wait a few minutes...

node app.js
if %errorlevel% neq 0 (
    echo An error occurred. Please check the details above.
)

pause