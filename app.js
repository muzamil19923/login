var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./models/db.js');

var routes = require('./routes/routes.js');
app.use('/',routes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, function(){ 
   console.log(`Express listening on port ${PORT}`); 
});