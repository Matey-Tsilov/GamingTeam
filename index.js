const express = require('express')
const routes = require('./routes')
const {PORT} = require('./constants')

const cookieParser = require('cookie-parser')

const server = express()
const {auth} = require('./middlewares/authMiddleware')

//dataBase init
const { dbinit } = require('./config/dbinit')
dbinit()
//handlebars init
require('./config/handlebarsinit')(server)

server.use(express.urlencoded({extended: false}))
server.use(express.static('public'))
server.use(cookieParser())
server.use(auth)
server.use(routes)

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))

