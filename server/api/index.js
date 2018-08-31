const router = require('express').Router()

const { Coin, Origin } = require('../db')

router.get('/coins', async (req, res, next) => {
  try {
    res.json(await Coin.findAll({
      include: Origin
    }))
  } catch (err) {
    next(err)
  }
})

// not necessary for code demo, just giving an example for its own sake
router.get('/origins', async (req, res, next) => {
  try {
    res.json(await Origin.findAll())
  } catch (err) {
    next(err)
  }
})

router.use((req, res, next) => {
  const err = new Error('API route not found')
  err.status = 404
  next(err)
})

module.exports = router
