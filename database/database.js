const { Pool, Client } = require('pg')
const config = require('../config/db.json')

const pool = new Pool(config.dev)

module.exports = pool
