@echo off

cd C:\Users\Public\Documents\Minecraft Server\java

REM ECHO %FullPath% & PAUSE

setlocal enabledelayedexpansion

set message = %1

echo %message%

set URL="http://mine.philamb.info/?command=/say%%20%1"

SET URL=!URL: =%%20!
call :subroutine URL
exit /b

:subroutine
curl -i -X GET !%1!
exit /b