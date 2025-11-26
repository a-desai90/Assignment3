
var express = require('express');
var router = express.Router();
let Assignment = require('../model/assignment');

// GET route for assignments read from DB
router.get('/', async function(req, res, next) {
    try {
    let assignmentList = await Assignment.find().sort({ dueDate: 1 });

    res.render('Assignments/list', {
        title: 'Assignments',
        AssignmentList: assignmentList
    });
    } catch (err) {
    console.error(err);
    next(err);
    }
});

// Get route for add page
router.get('/add', function(req, res, next) {
    res.render('Assignments/add', {
    title: 'Add Assignment'
    });
});

// POST route for add page
router.post('/add', async function(req, res, next) {
    try {
    let newAssignment = new Assignment({
        title: req.body.title,
        course: req.body.course,
        dueDate: req.body.dueDate,
        status: req.body.status,
        notes: req.body.notes
    });

    await Assignment.create(newAssignment);
    res.redirect('/assignments');
    } catch (err) {
    console.error(err);
    next(err);
    }
});

// GET route for edit form
router.get('/edit/:id', async function(req, res, next) {
    let id = req.params.id;

    try {
    let assignmentToEdit = await Assignment.findById(id);

    if (!assignmentToEdit) {
        return res.redirect('/assignments');
    }

    res.render('Assignments/edit', {
        title: 'Edit Assignment',
        Assignment: assignmentToEdit
    });
    } catch (err) {
    console.error(err);
    next(err);
    }
});

// POST route for edit form
router.post('/edit/:id', async function(req, res, next) {
    let id = req.params.id;

    try {
    let updatedAssignment = {
        title: req.body.title,
        course: req.body.course,
        dueDate: req.body.dueDate,
        status: req.body.status,
        notes: req.body.notes
    };

    await Assignment.findByIdAndUpdate(id, updatedAssignment);
    res.redirect('/assignments');
    } catch (err) {
    console.error(err);
    next(err);
    }
});

// GET route for delete
router.get('/delete/:id', async function(req, res, next) {
    let id = req.params.id;

    try {
    await Assignment.findByIdAndDelete(id);
    res.redirect('/assignments');
    } catch (err) {
    console.error(err);
    next(err);
    }
});

module.exports = router;

