const router = require('express').Router()

const Coins = require('../db').Coins

router.get('/coins', async (req, res, next) => {
  try {
    res.json(await Coins.findAll())
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
