@echo off
REM Recursively remove all files that start with "tmp" and end with "cwd"
REM from the EventMonitoring directory

setlocal enabledelayedexpansion

echo Searching for files matching pattern: tmp*cwd
echo.

set count=0

REM Change to the root of EventMonitoring project
cd /d "%~dp0..\.."

REM Find and delete all files matching the pattern
for /r %%f in (tmp*cwd) do (
    if exist "%%f" (
        echo Deleting: %%f
        del /f "%%f"
        set /a count+=1
    )
)

echo.
echo Total files deleted: %count%
echo Done.

endlocal
pause