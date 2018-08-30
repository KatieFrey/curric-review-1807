const Sequelize = require('sequelize')
const db = require('./database')

module.exports = db.define('coin', {
    name: Sequelize.STRING,
    origin: Sequelize.STRING
})
