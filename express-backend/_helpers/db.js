/**
 * Connects to MongoDB using Mongo.
 * Exports database model objects.
 */
//const config = require('config.json');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//|| config.localConnectionString,

mongoose.connect(process.env.DB_CONNECT_STRING ,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connected to mongodb.'))
    .catch(() => console.log('Error. Connection to mongodb failed.'));

mongoose.Promise = global.Promise;

module.exports = {
    User: require('../features/users/user.model'),
    Issue: require('../features/issues/issue.model')
};
