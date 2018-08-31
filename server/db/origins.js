const Sequelize = require('sequelize')
const db = require('./database')

module.exports = db.define('origin', {
    name: Sequelize.STRING,
})
