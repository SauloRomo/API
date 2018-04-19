var mysql = require('mysql');
var config = require('../config.js');

var database = {};

// Max MySQL Connections = %(PeakHits / PeakHours / 60 Minutes / 60 Seconds)
// For example, if you are running a Wordpress blog that receives up to 100,000 page hits during a 2 hour peak window period, here's how this formula works out for you:
// %(100,000 / 2 / 60 / 60) = 14 Concurrent MySQL Connections 

var poolMultipleconnections = mysql.createPool({ connectionLimit: 15, host: config.host, user: config.user, password: config.password, database: config.database, dateStrings: 'date', debug: false });

var poolOneconnection = mysql.createPool({ connectionLimit: 1, host: config.host, user: config.user, password: config.password, database: config.database, dateStrings: 'date', debug: false });

var i = 0;

poolMultipleconnections.on('enqueue', function() {
    //console.log('Esperando una conexión en poolMultipleconnections', i++);
});

var j = 0;

poolOneconnection.on('enqueue', function() {
    //console.log('Esperando una conexión en poolOneconnection', j++);
});

database.callProcedureParams = function(storedProcedure, params, res) {

    poolOneconnection.getConnection(function(error, connection) {
        if (error) {
            //console.log(error);

            connection.release();

            res(error, null);
        }

        if (error) throw error;

        if (connection) {

            connection.connect();

            connection.query(storedProcedure, params, function(error, rows) {
                connection.release();

                if (error) {
                    res(error, null);
                } else {
                    res(null, rows[0]);
                }

            });

        } else {
            res('Sin conexíon a la base de datos', null);
        }

    });

};

database.callProcedure = function(storedProcedure, res) {

    poolOneconnection.getConnection(function(error, connection) {
        if (error) {
            console.log(error);

            connection.release();

            res(error, null);
        }

        if (error) throw error;

        if (connection) {
            connection.query(storedProcedure, function(error, rows) {
                connection.release();

                if (error) {
                    res(null, null);
                } else {
                    res(null, rows[0]);
                }
            });

        } else {
            res('Sin conexíon a la base de datos', null);
        }

    });

};

database.callProcedureParamsAsync = function(storedProcedure, params, res) {

    poolMultipleconnections.getConnection(function(error, connection) {
        if (error) {
            //console.log(error);

            connection.release();

            res(error, null);
        }

        if (error) throw error;

        if (connection) {

            connection.connect();

            connection.query(storedProcedure, params, function(error, rows) {
                connection.release();

                if (error) {
                    res(error, null);
                } else {
                    res(null, rows[0]);
                }

            });

        } else {
            res('Sin conexíon a la base de datos', null);
        }

    });

};

database.callProcedureAsync = function(storedProcedure, res) {

    poolMultipleconnections.getConnection(function(error, connection) {
        if (error) {
            //console.log(error);

            connection.release();

            res(error, null);
        }

        if (error) throw error;

        if (connection) {
            connection.query(storedProcedure, function(error, rows) {
                connection.release();

                if (error) {
                    res(null, null);
                } else {
                    res(null, rows[0]);
                }
            });

        } else {
            res('Sin conexíon a la base de datos', null);
        }

    });

};

module.exports = database;