const express = require('express');
const router = express.Router();
const account_ctl = require('../controller/account')
const projects_ctl = require('../controller/projects')
const bodyParser = require('body-parser');
const jwt = require('../jwt/JWT')


router.use(bodyParser.json())

//account/login
router.post('/login', account_ctl.login);
router.post('/account', account_ctl.register);
router.get("/account", jwt.verifyJWT, account_ctl.listAll);
router.get("/logoff", account_ctl.logout);

//projects
router.get("/projects", jwt.verifyJWT, projects_ctl.getProjects);
router.get("/projects/:bundle", jwt.verifyJWT, projects_ctl.getProjectItem);
router.post("/projects", jwt.verifyJWT, projects_ctl.createNewProject);


module.exports = router;

