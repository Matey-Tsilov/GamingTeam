const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required!'],
        minLength: [4, 'The name should be at least four characters.']
    },
    image: {
        type: String,
        required: [true, 'The image is required!']
        // match: ['^(http|https)://', 'The game image should start with "http://" or "https://".']
    },
    price: {
        type: Number,
        required: [true, 'The price is required!'],
        min: [1, 'The price should be a positive number.']

    },
    description: {
        type: String,
        required: [true, 'The description is required!'],
        minLength: [10, 'The description should be at least ten characters.']

    },
    genre: {
        type: String,
        required: [true, 'The genre is required!'],
        minLength: [2, 'The genre should be at least two characters.']

    },
    platform: {
        type: String,
        enum: {values: ["PC", "Nintendo", "PS4", "PS5", "XBOX"], message: "There is no such thing like {VALUE}"}
    },
    boughtBy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game