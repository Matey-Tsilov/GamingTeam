const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
    .then(hashedPass => {
        this.password = hashedPass

        next()
    })
})

module.exports = User