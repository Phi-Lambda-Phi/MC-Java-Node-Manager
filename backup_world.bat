:: @echo off
For /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set currDate=%%c-%%a-%%b)
For /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set currTime=%%a%%b)

cd C:\Users\Public\Documents\Minecraft Server\java

:: 	Use HTTP GET to send save-all command to server
curl -i -X GET http://mine.philamb.info/?command=/save-allcurl http://mine.philamb.info/?command=/save-all
timeout /t 5
::	Stop server
pm2 stop Minecraft-Java
timeout /t 5
::	Copy world files to backup with current date
xcopy "philamb.info" "world.backups/%currDate%_%currTime%.philamb.info" /s/h/e/k/f/c/Y
timeout /t 5
::	Restart the server
pm2 start Minecraft-Java