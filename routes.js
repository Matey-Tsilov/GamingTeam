const router = require('express').Router()
const gameController = require('./controllers/gameController')
const authController = require('./controllers/authController')

router.use(gameController)
router.use('/auth', authController)

module.exports = router