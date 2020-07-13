

module.exports.getUser = function (req, results) {
    var request = require('request');
    const os = require("os");
    require('dotenv').config()

    const options = {
        url: process.env.HOST + "/api/account/" + req.cookies.user_id,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'x-access-token': req.cookies.token
        }
    };

    request(options, function (error, response, body) {
        console.log(JSON.parse(body).success)
        console.log(JSON.parse(body))
        if (JSON.parse(body).success == false || error) {
            console.log(error)
            return results(error, null);
        }
        return results(null, JSON.parse(body).data[0])
    });
}