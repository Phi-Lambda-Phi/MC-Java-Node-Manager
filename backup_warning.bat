:: @echo off

cd C:\Users\Public\Documents\Minecraft Server\java

:: 	Use HTTP GET to send save-all command to server

set t = %1

set URL=http://mine.philamb.info/?command=/say%%20The%%20server%%20will%%20be%%20restarting%%20in%%20%1%%20minutes%%20to%%20backup%%20files.%%20%1%%20minutes%%20until%%20server%%20restart

echo %URL%

curl -i -X GET %URL%