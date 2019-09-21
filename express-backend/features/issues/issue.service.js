const db = require('_helpers/db.js');
const Issue = db.Issue;

module.exports = {
    getAllByUser,
    create,
    update,
    delete: _delete
};

async function getAllByUser(userId) {
    return await Issue.find({ author: userId});
}

async function create(title, description, severity, userId) {
    const issue = new Issue({
        title: title,
        description: description,
        severity: severity,
        author: userId
    });
    await issue.save();
}

async function update(id, issueParam) {
    const issue = await Issue.findById(id);
    // validate
    if (!issue) throw 'Issue not found';

    Object.assign(issue,issueParam);

    await issue.save();
}

async function _delete(id) {
    await Issue.findByIdAndRemove(id);
}







