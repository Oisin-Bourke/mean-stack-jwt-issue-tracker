const express = require('express');
const router = express.Router();
const issueService = require('./issue.service');

router.get('/', getAll);
router.get('/:userId', findAll);
router.get('/:userId/urls',getUrls);
router.get('/:userId/get/:issueId', findIssue);
router.post('/:userId/add_issue', create);
router.put('/:userId/update/:issueId', update);
router.delete('/delete/:issueId', _delete);

module.exports = router;

function getAll(req, res, next) {
    issueService.getAll()
        .then(issues => res.json(issues))
        .catch(err => next(err));
}

function findAll(req,res, next) {
    issueService.getAllByUser(req.params.userId)
        .then(issues => res.json(issues))
        .catch(err => next(err));
}

function findIssue(req, res, next) {
    issueService.getIssueById(req.params.issueId)
        .then(issue => res.json(issue))
        .catch(err => next(err));
}

function create(req, res, next) {
    issueService.create(req.body.title, req.body.description, req.body.url, req.body.responsible, req.body.severity, req.params.userId)
        .then(() => res.json({ message: 'New issue created' }))
        .catch(err => next({ message: err.message}));
}

function update(req, res, next) {
    issueService.update(req.params.issueId, req.body)
        .then(() => res.json({ message: 'Issue updated' }))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    issueService.delete(req.params.issueId)
        .then(() => res.json({ message: 'Issue deleted'}))
        .catch(err => next(err));
}

function getUrls(req, res, next ) {
    issueService.getUrls(req.params.userId)
        .then(urls => res.json(urls))
        .catch(err => next(err));
}


