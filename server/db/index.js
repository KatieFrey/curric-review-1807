const db = require('./database')

const Coin = require('./coins')
const Origin = require('./origins')

Coin.belongsTo(Origin)
Origin.hasMany(Coin)

module.exports = {
  db,
  Coin,
  Origin
}
