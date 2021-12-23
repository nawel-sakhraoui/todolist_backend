var mysql           = require('mysql'),
    express         = require('express'),
    //jwt             = require('jsonwebtoken'),
     CryptoJS        = require("crypto-js"),
    jwt             = require('jsonwebtoken'),
	bodyParser      = require('body-parser');


const app= express();
app.use(function (req, res, next) {

   
    	res.setHeader('Access-Control-Allow-Origin',  'http://localhost:4200' );
    	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept , Authorization');
    	
	    res.setHeader('Content-Type', 'application/json');

	res.setHeader('Access-Control-Allow-Credentials', true);

    	next();
});

//app.use(bearerToken());


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); // for json encoded bodies


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "todolistsBase"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("mysql server Connected!");
});

require ('./app/create.js')(con) 
require ('./app/user.js')(app,con,CryptoJS, jwt) 
require ('./app/todolist.js')(app,con) 


const http = require('http');
const server = http.createServer(app);
server.listen(3000,'localhost', function(req, res){
        console.log('backend Server is running in port 3000 ');
 });


