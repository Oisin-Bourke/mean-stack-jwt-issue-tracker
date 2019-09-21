/**
 * Use Mongoose to define schema.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    //company: { type: String, trim: true, required: true },
    //email: { type: String, trim: true, required: true },
    //telephone: { type: String, trim: true, require: true },
    createdDate: { type: Date, default: Date.now }
});

/*
Same as toObject which converts document into a plant js object (only applies when toJSON is called).
Applied to all schema documents by default, rather than per document basis.
 */
userSchema.set('toJSON', { virtuals: true });

/*
userSchema.virtual('issues', {
    ref: 'Issue',
    localField: '_id',
    foreignField: 'author'
})
*/

module.exports = mongoose.model('User', userSchema);
