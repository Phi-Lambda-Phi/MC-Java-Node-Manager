/*	app.js

	For Indian Hills Community College
	Parking On Hills, https://parking.indianhils.edu
	by Blaine Harper

	PURPOSE: Root application for parking registartion UI and API
*/

const multer = require("multer");
const fs = require('fs');
const createError = require('http-errors');
const moment = require('moment');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cluster = require('cluster');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const msal = require('@azure/msal-node');
const axios = require('axios');
var favicon =	require('serve-favicon');
var cors = require('cors');

var protocols = ['https://','http://'];
var origins = [];

var app = express();

DEBUG = 	true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

// CORS
app.use(cors({
    origin: '*'
}));

require("dotenv").config({ path: __dirname + `/.env.dev` }); 

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

//	Set an endpoint for the root directory
app.use(`/`,require(`./routes/index`));
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('base/error');
});

// Failsafe App.js relaunch
if (cluster.isPrimary) {
	cluster.fork();
	
	cluster.on('exit', function(worker, code, signal) {
		cluster.fork();
	});
} else {
	app.listen(process.env.PORT, () => {
		console.log(`App listening on port ${process.env.PORT}`)
	});
}

module.exports = app;
