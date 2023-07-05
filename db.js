const mongoose = require('mongoose')

const mongURI = "mongodb://127.0.0.1:27017"

const connectToMongo = () => {
    mongoose.connect(mongURI)
}
module.exports = connectToMongo;