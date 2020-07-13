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

var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.engine('hbs', exphbs({
    defaultLayout: 'index',
    extname: '.hbs',
    partialsDir: [path.join(__dirname, '/views/share/'), path.join(__dirname, '/views/contents/')]
}));

app.use((error, req, res, next) => {
    console.log('Error status: ', error.status)
    console.log('Message: ', error.message)
})

app.get('/:page', jwt.verifyCacheJWT, (req, res, next) => {

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
        var _projects = [{
            id: 12,
            name: "App CEA 1.0",
            bundle: "app-cea-1.0.0",
            status: 1
        }, {
            id: 12,
            name: "App CEA 1.0",
            bundle: "app-cea-1.0.0",
            status: 1
        }, {
            id: 12,
            name: "App CEA 1.0",
            bundle: "app-cea-1.0.0",
            status: 1
        }, {
            id: 12,
            name: "App CEA 1.0",
            bundle: "app-cea-1.0.0",
            status: 1
        }, {
            id: 12,
            name: "App CEA 1.0",
            bundle: "app-cea-1.0.0",
            status: 1
        }, {
            id: 12,
            name: "App CEA 1.0",
            bundle: "app-cea-1.0.0",
            status: 1
        }, {
            id: 12,
            name: "App CEA 1.0",
            bundle: "app-cea-1.0.0",
            status: 1
        }, {
            id: 12,
            name: "App CEA 1.0",
            bundle: "app-cea-1.0.0",
            status: 1
        }]

        console.log(res)

        if (checkView(req.params.page)) {
            repository.getUser(req, function (err, results) {
                res.render(req.params.page, {
                    layout: false,
                    config: routes.homeDark,
                    data: results,
                    projects: _projects,
                    size: 1234
                })
            });
        } else {
            res.render('error', {
                layout: false,
                config: routes.homeDark
            })
        }
    /*  res.render("login", {
          layout: false,
          config: routes.homeDark,
          data: [],
          projects: []
      })  */}
})


function checkView(view) {
    console.log(view)
    var sizeList = application.views.filter(function (route) {
        return route == view;
    });
    return sizeList.length > 0
}

module.exports = app;


