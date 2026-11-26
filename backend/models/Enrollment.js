const mongoose = require('mongoose');
const enrollmentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        trim: true
    },
    courseId: {
        type: String,
        required: true,
        trim: true
    }
});
enrollmentSchema.index(
    { studentsId: 1, courseId: 1},
    { unqiue: true }
);
module.exports = mongoose.model('Enrollment', enrollmentSchema);