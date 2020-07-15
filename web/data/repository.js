

module.exports.getProjects = function (req, results) {
    var request = require('request');
    const os = require("os");
    require('dotenv').config()

    const options = {
        url: process.env.HOST + "/api/projects",
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'x-access-token': req.cookies.token
        }
    };

    request(options, function (error, response, body) {
        if (JSON.parse(body).success == false || error) {
            console.log(error)
            return results(error, null);
        }
        return results(null, JSON.parse(body).data)
    });
}

module.exports.getProjectItem = function (req, results) {
    var request = require('request');
    const os = require("os");
    require('dotenv').config()

    var bundle = Object.keys(req.query)[0]
    var consoleRoute = ""
    if (bundle.indexOf("/") != -1) {
        consoleRoute = bundle.split("/")[1]
        bundle = bundle.split("/")[0]
    }

    const options = {
        url: process.env.HOST + "/api/projects/" + bundle,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'x-access-token': req.cookies.token
        }
    };

    request(options, function (error, response, body) {
        if (JSON.parse(body).success == false || error) {
            console.log(error)
            return results(error, null);
        }
        return results(null, JSON.parse(body).data)
    });
}