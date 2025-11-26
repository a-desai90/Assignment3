const mongoose = require('mongoose');

let assignmentSchema = mongoose.Schema(
    {
    title: { type: String, required: true},
    course: { type: String, required: true},
    dueDate: { type: Date, required: true },
    status: { type: String, default: 'Not Started' },
    notes: { type: String,}
    },
    { collection: 'assignments' }
);


module.exports = mongoose.model('Assignment', assignmentSchema);
