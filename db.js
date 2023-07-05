const mongoose = require('mongoose')

console.log(process.env.DB_URL)
const mongURI = process.env.DB_URL;


const connectToMongo = () => {
    mongoose.connect(mongURI)
}

module.exports = connectToMongo;