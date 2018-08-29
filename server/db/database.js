const Sequelize = require('sequelize')
const db = new Sequelize(
    process.env.DATABASE_URL || 'postgres://localhost/YOUR_DB',
    {
        operatorsAliases: false,
    }
)

module.exports = db
