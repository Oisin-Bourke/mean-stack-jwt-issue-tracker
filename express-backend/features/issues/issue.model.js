/**
 * Use Mongoose to define schema.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    url: { type: String, trim: true, required: true },
    severity: { type: String },
    status: { type: String, default: 'Open' },
    createdDate: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
});

/*
Same as toObject which converts document into a plant js object (only applies when toJSON is called).
Applied to all schema documents by default, rather than per document basis.
 */
issueSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Issue', issueSchema);
