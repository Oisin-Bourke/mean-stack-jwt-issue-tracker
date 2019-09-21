const express = require('express');
const router = express.Router();
const issueService = require('./issue.service');

router.get('/:userId', findAll);
router.post('/:userId/comment', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function findAll(req,res, next) {
    issueService.getAllByUser(req.params.userId)
        .then(issues => res.json(issues))
        .catch(err => next(err));
}

function create(req, res, next) {
    issueService.create(req.body.title, req.body.description,req.body.severity, req.params.userId)
        .then(() => res.json({ message: 'New issue created' }))
        .catch(err => next({ message: err.message}));
}

function update(req, res, next) {
    issueService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Issue updated' }))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    issueService.delete(req.params.id)
        .then(() => res.json({ message: 'Issue deleted'}))
        .catch(err => next(err));
}

