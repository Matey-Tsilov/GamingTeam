const hbs = require('express-handlebars')

module.exports = (server) => {
server.engine('hbs', hbs.engine({
    extname: 'hbs'
}))
server.set('view engine', 'hbs')
}