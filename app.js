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

app.listen(PORT, () => {
    console.log('escutando a porta ' + PORT);
})