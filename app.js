var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fetch = require('node-fetch');
var cookieParser = require('cookie-parser');

var app = express();

// Static variables
var port = 3000;
var publicPath = __dirname+"\\public";


//View Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

///// MIDDLEWARE SETUP /////
// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Cookie Parser Middleware
app.use(cookieParser());
////////////////////////////

// Set Static Path
app.use(express.static(path.join(__dirname,'public')));

///// TASK MANAGEMENT /////

// Task 2 variables
var authorsUrl = "https://jsonplaceholder.typicode.com/users";
var postsUrl = "https://jsonplaceholder.typicode.com/posts";

// Fetch data from url in JSON format
function getDataFromUrl(url,resp){
	fetch(url)
		.then(function(data) {
			return data.json();
		}).then(function(parsed){
			resp(parsed);
		});
}
///////////////////////////


// Routing
app.get('/', function (req, res) {
	//res.sendFile(path.join(publicPath, 'index.html'));
	//res.render('index');
	// Automatically serving index.html from pubic folder
});

app.get('/about', function (req, res) {
	//res.send(staticPath);
	res.sendFile(path.join(publicPath, 'about.html'));
});

app.get('/authors', function (req, res) {
	getDataFromUrl(authorsUrl,function(resp){
		res.render('authors',{
			title: "Authors",
			authors:resp
		});
	});
});

app.get('/authors.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'authors.js'));
});

app.get('/setcookie', function (req, res) {
	res.cookie('Manthan','21');
	res.send("<h2>Cookie Set!</h2><hr/><button onclick='window.location=\"/\"'>Home</button> <button onclick='window.location=\"getcookies\"'>Get Cookies</button>");
});

app.get('/getcookies', function (req, res) {
	res.send("<h2>Cookies : </h2><br/>"+JSON.stringify(req.cookies)+"<hr/><button onclick='window.location=\"/\"'>Home</button>");
});

app.get('/robots.txt', function (req, res) {
	res.render('deny');
});

app.get('/image', function (req, res) {
	res.render('image');
});

app.get('/input', function (req, res) {
	res.render('input');
});

app.post('/inputEndPoint', function (req, res) {
	console.log("You typed : "+req.body.input);
	res.send("<h2>Data Logged!</h2><p>You entered : <i>"+req.body.input+"</i></p><hr/><button onclick='window.location=\"/\"'>Home</button>");
});

// Start and Listen on port
app.listen(port, function(){
	console.log("Server started on port "+port);
});