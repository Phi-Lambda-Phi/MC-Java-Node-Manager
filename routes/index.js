/*	index.js

	For Indian Hills Community College
	Parking On Hills, https://parking.indianhils.edu
	by Blaine Harper

	PURPOSE: Root router for express server
*/	
var fs = require('fs');
var express = require('express');
var router = express.Router();
const path = require('path');
require('dotenv').config();

var fetch = require('../fetch');
var { GRAPH_ME_ENDPOINT } = require('../authConfig');

require('dotenv').config({ path: '.env.dev' });

/* GET cover page. */
router.get('/', function(req, res, next) {
	res.render('base/mixins/cover', { 
		title: 'Phi Lambda Phi', 
		subtitle: 'Minecraft Server Administration - JAVA'});
});

/* Redirect to login page. */
router.get('/login', function(req, res, next) {
	res.redirect('/users/me');
});


/* GET home page. */
router.get('/home', function(req, res, next) {
//		Put Buttons in Subcontent
		subcontent = ``;
		subcontent += `WIP`;
		content = [{parallax: {rem:'10', url:'/res/plp/graphics/philamb_flag.png'}, hero : {title:'Server Commands', content:subcontent}}];
		
		res.render('pages/basicText', { 
			title:'Commands', 
			page:{
				content: content
		}
	});
});

router.get('/status', function(req, res, next) {
	res.send({'status':200});
});

module.exports = router;
