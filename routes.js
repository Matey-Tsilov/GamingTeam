const router = require('express').Router()
const gameController = require('./controllers/gameController')
const authController = require('./controllers/authController')
const show404 = require('./controllers/show404')

router.use(gameController)
router.use('/auth', authController)
router.use('/*', show404)

module.exports = router