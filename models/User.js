const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [5, 'The username should be at least five characters long.']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [10, 'The email should be at least ten character long.']
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'The password should be at least four character long.']
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