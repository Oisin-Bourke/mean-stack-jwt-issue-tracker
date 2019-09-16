/**
 * Use Mongoose to define schema.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, require: true },
    createdDate: { type: Date, default: Date.now }
});

/*
Same as toObject which converts document into a plant js object (only applies when toJSON is called).
Applied to all schema documents by default, rather than per document basis.
 */
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
