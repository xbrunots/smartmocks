const express = require('express');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3700;
const useragent = require('express-useragent');
const bodyParser = require('body-parser');

//Rotas
const web = require('./web/index');
const routes = require('./api/routes/routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(useragent.express());


app.use('/', web);
app.use('/api', routes);


app.get("/smartlink/coe", function (req, response) {

    var store = {
        androidStore: "https://install.appcenter.ms/users/xbrunots/apps/responsys/distribution_groups/android%20-%20coe%20delivery",
        isiPhone: "http://install.appcenter.ms/users/alessandro.lima-teceiro/apps/cea/distribution_groups/delivery%20mandalorian",
        desktop: "http://cea.com.br"
    }

    if (req.useragent.isMobile && req.useragent.isAndroid) {
        var json = {
            origin: "coe"
        }

        axios({
            headers: { 'content-type': 'application/json' },
            url: 'http://appb2c-dev-mandalorian.us-east-1.elasticbeanstalk.com/b2c-coe/api/v1/_qrcode',
            method: "POST",
            data: json
        }).then(res => {
            response.redirect(settings.androidStore)
        }).catch(error => {
            response.redirect(settings.desktop)
        })

    } else if (req.useragent.isMobile && req.useragent.isiPhone) {
        var json = {
            origin: req.path.replace("/", "")
        }
        axios({
            headers: { 'content-type': 'application/json' },
            url: 'http://appb2c-dev-mandalorian.us-east-1.elasticbeanstalk.com/b2c-coe/api/v1/_qrcode',
            method: "POST",
            data: json
        }).then(res => {
            response.redirect(settings.appleStore)
        }).catch(error => {
            response.redirect(settings.desktop)
        })

    } else {
        response.redirect(settings.desktop)
    }
})

app.listen(PORT, () => {
    console.log('escutando a porta ' + PORT);
})