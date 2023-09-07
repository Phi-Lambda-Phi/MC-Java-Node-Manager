// Require Node.js standard library function to spawn a child process
var spawn = require('child_process').spawn;

// Create a child process for the Minecraft server using the same java process
// invocation we used manually before
var minecraftServerProcess = spawn('java', [
    '-Xms1024M',
    '-Xmx2048M',
    '-jar',
    'server.jar',
    'nogui'
]);

// Listen for events coming from the minecraft server process - in this case,
// just log out messages coming from the server
function log(data) {
    process.stdout.write(data.toString());
}
minecraftServerProcess.stdout.on('data', log);
minecraftServerProcess.stderr.on('data', log);

// Create an express web app that can parse HTTP POST requests
var app = require('express')();
app.use(require('body-parser').urlencoded({
    extended:false
}));

// Create a route that will respond to a POST request
app.get('/java', function(req, res) {
    // Get the command from the HTTP request and send it to the Minecraft
    // server process
    var command = req.query.command;
    minecraftServerProcess.stdin.write(command+'\n');

    // buffer output for a quarter of a second, then reply to HTTP request
    var buffer = [];
    var collector = function(data) {
        data = data.toString();
        buffer.push(data.split(']: ')[1]);
    };
    minecraftServerProcess.stdout.on('data', collector);
    setTimeout(function() {
        minecraftServerProcess.stdout.removeListener('data', collector);
        res.send(buffer.join(''));
    }, 250);
});

var options = {
  tcp: false,       // false for UDP, true for TCP (default true)
};

//	game				tcp	chal
//	Any Source game		TCP	N/A
//	Minecraft			TCP	N/A		// For this app
//	Any GoldSrc game	UDP	Yes
//	Call of Duty		UDP	No

// Listen for incoming HTTP requests on port 3056
app.listen(3056);