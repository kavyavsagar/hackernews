'use strict';

var express 	= require('express'),    
    http 		= require('http'),
    fs 			= require('fs'),
    path 		= require('path'),
    port 		= 8080;

/*
 * Define apps and its use
 */
var app = express();

// Set views path, template engine and default layout
app.set('views',  path.join(__dirname));


// We keep the same public path so we can make use of the bootstrap assets
app.use(express.static( path.join(__dirname, 'assets')));

// set .html as the default extension
app.set('view engine', 'html');
// assign the template engine to .html files
app.engine('html', function(path, options, cb) {
    fs.readFile(path, 'utf-8', cb);
});


app.get('/', function(req, res){ 		
    res.render('index');   
});
/**
 * Start Server
 */
http.createServer(app).listen(port, function () { 
  console.log('Express server listening on port http://localhost:'+ port);
  var open = require('open');
  open('http://localhost:' +port+ '/');
});