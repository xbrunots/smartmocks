const pool = require('../../database/database');
var md5 = require('md5');
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

var jsonStruct = {
    success: false,
    message: "Teste",
    data: []
}


exports.getProjects = (request, response, next) => {

    jsonStruct.data = []

    pool.query('SELECT *,(select count(id)*7 from projects) as nameid FROM projects where owner =' + request.userId)
        .then(res => {

            jsonStruct.success = true
            jsonStruct.data = res.rows
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

exports.getProjectItem = (request, response, next) => {

    jsonStruct.data = []

    pool.query("SELECT *,(select count(id)*7 from projects) as nameid FROM projects where owner =" + request.userId + " and bundle = '" + request.params.bundle + "'")
        .then(res => {

            jsonStruct.success = true
            jsonStruct.data = res.rows
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


exports.createNewProject = (request, response, next) => {

    jsonStruct.data = []
    var query = "INSERT INTO projects (name, bundle, owner)   VALUES('" + request.body.name + "','" + request.body.bundle + "','" + request.userId + "'); "
    console.log(query)
    pool.query(query)
        .then(res => {

            jsonStruct.success = true
            jsonStruct.data = res.rows
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
