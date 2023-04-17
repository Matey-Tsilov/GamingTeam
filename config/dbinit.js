const mongoose = require('mongoose')

exports.dbinit = () => {
    mongoose.connection.on('open', () => {
        console.log('DB is connected!');
        
    })
    return mongoose.connect('mongodb://127.0.0.1:27017/gamingTeam')
} 