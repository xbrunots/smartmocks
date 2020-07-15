const pool = require('../../database/database');
var md5 = require('md5');
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

var jsonStruct = {
    success: false,
    message: "Teste",
    data: []
}

function generateToken(id, email, photo, username) {
    var token = jwt.sign({ id, email, photo, username }, process.env.SECRET, {
        expiresIn: process.env.TOKEN_TIME_OF_LIFE
    });
    return token
}

function logoff(response) {
    response.cookie('token', null);
    response.cookie('user_id', null);
    response.redirect('../login');
}

exports.logout = (request, response, next) => {
    logoff(response)
}

exports.login = (request, response, next) => {

    console.log(request.body)
    jsonStruct.data = []

    var email = request.body.email;
    var password = request.body.password;
    console.log(md5(password));
    pool.query("SELECT * FROM account where email = '" + email + "' and password ='" + md5(password) + "'")
        .then(res => {
            console.log(res.rows);
            if (res.rows.length > 0) {
                var _token = generateToken(
                    res.rows[0].user_id,
                    res.rows[0].email,
                    res.rows[0].photo,
                    res.rows[0].username)
                response.cookie('token', _token);
                response.cookie('user_id', res.rows[0].user_id);
                jsonStruct.success = true
                jsonStruct.token = _token
                jsonStruct.data = res.rows
                delete (jsonStruct.data[0].password)
                jsonStruct.message = "Sucesso!"
                response.status(200).send(jsonStruct)
            } else {
                jsonStruct.success = false
                jsonStruct.message = "Email ou senha errados!"
                response.status(200).send(jsonStruct)
            }
        })
        .catch(e => {
            console.error(e.stack)
            jsonStruct.success = false
            jsonStruct.message = e.stack
            response.status(200).send(jsonStruct)
        })

};

exports.register = (request, response, next) => {

    console.log(request.body)
    jsonStruct.data = []


    var email = request.body.email;
    var username = request.body.username;
    var password = request.body.password;
    console.log("-> " + md5(password));

    var insertQuery = "INSERT INTO account (username, email, password, created_on, last_login)  " +
        " VALUES ('" + username + "', '" + email + "', '" + md5(password) + "', NOW(), NOW())";

    var exist = "SELECT * FROM account where email = '" + email + "'";

    pool.query(exist)
        .then(res => {
            if (res.rows.length == 0) {
                pool.query(insertQuery)
                    .then(data => {
                        jsonStruct.success = true
                        console.log(res.rows)
                        jsonStruct.data = res.rows
                        jsonStruct.message = "Usuário " + username + " cadastrado com sucesso!"
                        response.status(200).send(jsonStruct)
                    })
                    .catch(e => console.error(e.stack))
            } else {
                jsonStruct.success = false
                jsonStruct.message = "Email " + email + " já cadastrado na base..."
                response.status(200).send(jsonStruct)
            }
        })
        .catch(e => {
            console.error(e.stack)
            jsonStruct.success = false
            jsonStruct.message = e.stack
            response.status(200).send(jsonStruct)
        })


};


exports.listAll = (request, response, next) => {

    jsonStruct.data = []

    pool.query('SELECT * FROM account where user_id =' + request.userId)
        .then(res => {

            jsonStruct.success = true
            jsonStruct.data = res.rows
            delete (jsonStruct.data[0].password)
            jsonStruct.message = "Sucesso!"
            response.status(200).send(jsonStruct)

        })
        .catch(e => {
            console.error(e.stack)
            jsonStruct.success = false
            jsonStruct.message = e.stack
            response.status(200).send(jsonStruct)
        })

};

exports.getUserById = (request, response, next) => {
    jsonStruct.data = []

    var query = 'SELECT * FROM account where user_id = ' + request.params.id
    pool.query(query)
        .then(res => {
            if (res.rows.length > 0) {
                console.log(res.rows)
                jsonStruct.success = true
                jsonStruct.data = res.rows
                delete (jsonStruct.data[0].password)
                jsonStruct.message = "Sucesso!"
                response.status(200).send(jsonStruct)
            } else {
                jsonStruct.success = false
                jsonStruct.data = []
                jsonStruct.message = "Nenhum usuário para o id " + request.params.id
                response.status(200).send(jsonStruct)
            }
        })
        .catch(e => {
            jsonStruct.success = false
            jsonStruct.data = []
            jsonStruct.message = "Nenhum usuário para o id " + request.params.id
            response.status(200).send(jsonStruct)
        })

};


