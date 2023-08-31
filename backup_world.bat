:: @echo off
For /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set currDate=%%c-%%a-%%b)
For /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set currTime=%%a%%b)

cd C:\Users\Public\Documents\Minecraft Server\java

:: 	Use HTTP GET to send save-all command to server
curl -i -X GET http://mine.philamb.info/?command=/save-allcurl http://mine.philamb.info/?command=/save-all
::	Stop server
call pm2 stop Minecraft-Java
::	Copy world files to backup with current date
xcopy "philamb.info" "world.backups/philamb.info/%currDate%_%currTime%.philamb.info" /h/e/k/f/c/Y
::	Restart the server
call pm2 start Minecraft-Java