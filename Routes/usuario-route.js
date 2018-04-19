var express = require('express');
var router = express.Router();
var usuario = require('../Models/Usuario.js');


router.post('/data', function(req, res) {
    console.log("Hola");
    res.send("hola");

});

router.get('/Hello', function(req, res) {
    console.log("Hola");
    res.send("hola");

});





router.get('/stock', function(req, res) {
    usuario.getData(function(error, data) {
        // console.log(data[0]);
        res.json(data[0]);
    });
});





module.exports = router;