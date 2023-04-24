const express = require('express')
const hbs = require('express-handlebars')
const routes = require('./routes')
const {PORT} = require('./constants')
const cookieParser = require('cookie-parser')

const server = express()
const {auth} = require('./middlewares/authMiddleware')

const { dbinit } = require('./config/dbinit')
dbinit()

server.engine('hbs', hbs.engine({
    extname: 'hbs'
}))
server.set('view engine', 'hbs')

server.use(express.urlencoded({extended: false}))
server.use(express.static('public'))
server.use(cookieParser())
server.use(auth)
server.use(routes)

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))

