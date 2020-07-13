const express = require('express');
const router = express.Router();
const routeName = "/account"
const routeLogin = "/login"
const controller = require('../controller/' + routeName)
const bodyParser = require('body-parser');
const jwt = require('../jwt/JWT')


router.use(bodyParser.json())

router.post(routeLogin, controller.login);
router.post(routeName, controller.register);
router.get(routeName, jwt.verifyJWT, controller.listAll);
router.get("/logoff", controller.logout);
router.get(routeName + "/:id", jwt.verifyJWT, controller.getUserById);

module.exports = router;

