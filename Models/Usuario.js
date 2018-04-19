var database = require('../helpers/database.js');

var usuario = {};



usuario.getData = function(req, res) {
    database.callProcedureParamsAsync('CALL get_usuarios (?,?)', [req.login, req.password], res);
}

module.exports = usuario;