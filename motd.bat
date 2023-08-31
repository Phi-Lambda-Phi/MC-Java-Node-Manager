:: @echo off

cd C:\Users\Public\Documents\Minecraft Server\java

:: 	Use HTTP GET to send save-all command to server

set URL=http://mine.philamb.info/?command=/say%%20Welcome%%20to%%20the%%20Phi%%20Lambda%%20Phi%%20Minecraft%%20Java%%20server!%%20Feel%%20free%%20to%%20mine%%20and%%20explore%%20at%%20your%%20leisure!

echo %URL%

curl -i -X GET %URL%