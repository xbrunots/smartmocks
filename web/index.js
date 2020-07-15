var express = require('express');
var app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const repository = require('./data/repository');
const routes = require('./data/routes.json')
const application = require('../config/application.json')
const jwt = require('../api/jwt/JWT')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));


var cookieParser = require('cookie-parser');
const { json } = require('express');
app.use(cookieParser())

app.engine('hbs', exphbs({
    defaultLayout: 'index',
    extname: '.hbs',
    partialsDir: [path.join(__dirname, '/views/share/'),
    path.join(__dirname, '/views/contents/console'), path.join(__dirname, '/views/contents/')]
}));

app.use((error, req, res, next) => {
    console.log('Error status: ', error.status)
    console.log('Message: ', error.message)
})

app.get('/:page', jwt.verifyCacheJWT, (req, res, next) => {

    var bundle = Object.keys(req.query)[0]
    var consoleRoute = "console"
    var animation = "___not___"
    if (bundle != undefined) {
        if (bundle.indexOf("/") != -1) {
            consoleRoute = bundle.split("/")[1]
            bundle = bundle.split("/")[0]
        }
    } else {
        animation = "animateDown"
    }
    console.log("-----------------")
    console.log(Object.keys(req.query)[0])
    console.log(consoleRoute)
    console.log(bundle)
    console.log(animation)
    console.log("-----------------")


    if (bundle != undefined) {
        repository.getProjectItem(req, function (err, results) {
            var sizeId = 0
            if (results != null && results.length > 0) {
                sizeId = results[0].nameid
            }
            var jsonSendWeb = {
                layout: false,
                config: routes.homeDark,
                headerAnimation: animation,
                data: {
                    username: req.username,
                    email: req.email,
                    photo: req.photo,
                    bundle: bundle,
                    [consoleRoute]: consoleRoute,
                    loading: consoleRoute,
                    loading_prefix: "abrindo "
                },
                projects: results,
                size: sizeId
            }
            console.log(jsonSendWeb)

            res.render(req.params.page, jsonSendWeb)
        });
    } else {

        if (req.path == "/apple-app-site-association") {
            res.json({
                "applinks": {
                    "apps": [],
                    "details": [{
                        "appID": "6K3965APXT.br.com.cea.appb2c",
                        "paths": ["*"]
                    }, {
                        "appID": "6K3965APXT.br.com.cea.appb2c-dev",
                        "paths": ["*"]
                    }, {
                        "appID": "6K3965APXT.br.com.cea.appb2c-homolog",
                        "paths": ["*"]
                    }]
                }
            })
        } else {
            if (checkView(req.params.page)) {
                repository.getProjects(req, function (err, results) {
                    var sizeId = 0
                    if (results != null && results.length > 0) {
                        sizeId = results[0].nameid
                    }

                    res.render(req.params.page, {
                        layout: false,
                        config: routes.homeDark,
                        headerAnimation: animation,
                        data: {
                            username: req.username,
                            email: req.email,
                            photo: req.photo
                        },
                        projects: results,
                        size: sizeId
                    })
                });
            } else {
                res.render('error', {
                    layout: false,
                    config: routes.homeDark
                })
            }
        }
    }

})



function checkView(view) {
    console.log(view)
    var sizeList = application.views.filter(function (route) {
        return route == view;
    });
    return sizeList.length > 0
}

module.exports = app;


