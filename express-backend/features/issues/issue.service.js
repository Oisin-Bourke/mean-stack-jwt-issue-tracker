const db = require('_helpers/db.js');
const Issue = db.Issue;

module.exports = {
    getAll,
    getAllByUser,
    getIssueById,
    create,
    update,
    delete: _delete,
    getUrls,
};

async function getAll() {
    return await Issue.find();
}

async function getAllByUser(userId) {
    return await Issue.find({ author: userId});
}

async function getIssueById(issueId) {
    return await Issue.findById(issueId);
}

async function create(title, description, url, responsible, severity, userId) {
    const issue = new Issue({
        title: title,
        description: description,
        url: url,
        responsible: responsible,
        severity: severity,
        author: userId
    });
    await issue.save();
}

async function update(issueId, issueParam) {
    console.log('issueid' + issueId);
    const issue = await Issue.findById(issueId);
    // validate
    if (!issue) throw 'Issue not found';

    Object.assign(issue,issueParam);
    await issue.save();
}

async function _delete(id) {
    await Issue.findByIdAndRemove(id);
}

async function getUrls(userId) {
    return await Issue.find({ author: userId}).select('url');
}







