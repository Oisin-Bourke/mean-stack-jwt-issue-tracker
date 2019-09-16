/**
 * Connects to MongoDB using Mongo.
 * Exports database model objects.
 */

const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully!');
});

module.exports = {
    User: require('../features/users/user.model')
};
