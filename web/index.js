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
    var loadinMessage = "console"
    var animation = "___not___"
    var module_event = ""
    if (bundle != undefined) {
        if (bundle.indexOf("/") != -1) {
            consoleRoute = bundle.split("/")[1]
            loadinMessage = consoleRoute
            if (bundle.split("/").length > 1) {
                module_event = bundle.split("/")[2]
                loadinMessage = consoleRoute + " " + module_event
            }

            bundle = bundle.split("/")[0]
        }
    } else {
        animation = "animateDown"
    }

    if (module_event == undefined) {
        loadinMessage = consoleRoute
    } else {
        loadinMessage = consoleRoute + "/" + module_event
    }


    var array_routes = [
        { id: 0, name: "login", visibility: "public" },
        { id: 1, name: "accounts", visibility: "public" },
        { id: 2, name: "configs", visibility: "public" },
        { id: 3, name: "home", visibility: "public" },
        { id: 4, name: "products", visibility: "private" },
        { id: 5, name: "clients", visibility: "private" },
        { id: 6, name: "partners", visibility: "private" },
        { id: 7, name: "clientStatus", visibility: "private" },
        { id: 8, name: "productImages", visibility: "private" },
        { id: 9, name: "bazar", visibility: "private" },
        { id: 10, name: "market", visibility: "private" },
        { id: 11, name: "crm", visibility: "private" },
        { id: 12, name: "iccp12", visibility: "private" }
    ]


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
                    module: consoleRoute,
                    [consoleRoute]: consoleRoute,
                    loading: loadinMessage,
                    loading_prefix: "abrindo ",
                    array_routes: JSON.stringify(array_routes),
                    module_event: module_event
                },
                projects: results,
                size: sizeId
            }

            console.log(jsonSendWeb)
            res.render(req.params.page, jsonSendWeb)
        });
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
                        photo: req.photo,
                        array_routes: array_routes
                    },
                    projects: results,
                    size: sizeId
                })


                //console.log(jsonSendWeb)
            });
        } else {
            res.render('error', {
                layout: false,
                config: routes.homeDark
            })
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


