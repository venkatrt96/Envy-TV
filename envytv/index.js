// Importing Modules
var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

const port = 4200;

// Adding Middleware - cors
app.use(cors());
app.use(bodyparser.json());

// Route
app.use('/api', route);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Testing Server
app.get('/', function(request, response) {
    response.send('Hola !!');
});

app.listen(port, function() {
    console.log('Server started at port : ' + port);
});
