// Configuracion de servicio
// ****
// Author : Carmen Rivera
// ***
// 19/04/2018
// *****
// server.js es como su nombre lo indica archivo de ejecusion del servicio

var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var router = express.Router();
var cron = require('node-cron');
var producto = require('./models/productos.js');


var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('../APP'));
app.use(function(req, res, next) {
    // if (err.constructor.name === 'UnauthorizedError') {
    //     res.status(401).send('Unauthorized');
    // }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

var route = require('./routes/usuario_route.js');
app.use('/', route);


app.listen(8080, function() {
    console.log('Escuchado desde localhost:8080');
});