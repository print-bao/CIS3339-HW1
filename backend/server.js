require('dotenv').config();
const connectDB = require('./config/db');

const express = require('express');
const cors = require('cors');
const path = require('path');

const Student = require('./models/Student');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');

const app = express();
app.use(cors());
app.use(express.json());
//debug
app.get('/debug', (req, res) => {
    res.json({
        version: 'MongoDB Backend',
        file: __filename,
        pid: process.pid
    });
});

// Endpoint to search for a student by name
app.post('/find-student', async (req, res) => {
    try{
        const { name } = req.body;
        if (!name){
            return res.status(400).json({
                error: 'Student Name is Required.'
            });
        }
        const student = await Student.findOne({ name });
        if (!student){
            return res.status(404).json({
                error: 'Student Not Found.'
            });
        }
        res.json(student);
    } catch (error){
        console.error('Error in finding student:', error);
        res.status(500).json({
            error: 'Internal Server Error...'
        });
    }
});

// Endpoint to save a student
app.post('/add-student', async (req, res) => {
    try{
        const { name, id, phone, zip } = req.body;
        if (!name || !id || !phone || !zip){
            return res.status(400).json({
                error: 'All Fields Are Required!'
            });
        }
        const existingStudent = await Student.findOne({ id });
        if (existingStudent){
            return res.status(409).json({
                error: 'Student ID Already Exists.'
            });
        }
        const newStudent = await Student.create({
            name, id, phone, zip
        });
        res.status(201).json({
            message: 'Student has been added successfully!',
            student: newStudent
        });
    } catch (error){
        console.error('Error Adding Student:', error);
        if (error.code === 11000){
            return res.status(409).json({
                error: 'Student ID already exists.'
            });
        }
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// Endpoint to delete a student by name
app.post('/delete-student', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name){
            return res.status(400).json({
                error: 'Student Name is Required!'
            });
        }
        const deletedStudent = await Student.findOneAndDelete({
            name
        });
        if (!deletedStudent){
            return res.status(404).json({
                error: 'Student Not Found.'
            });
        }
        await Enrollment.deleteMany({
            studentId: deletedStudent.id
        });
        res.json({
            message: 'Student deleted successfully',
            student: deletedStudent
        });
    } catch (error){
        console.error('Error deleting student:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
//Endpoint to retrieve all students
app.get('/students', async (req, res) => {
    try{
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            error: 'Unable to Retrieve Students..'
        });
    }
});

//Endpoint to retrieve all courses
app.get('/courses', async (req, res) => {
    try{
        const courses = await Course.find();
        res.json(courses);
    } catch (error){
        res.status(500).json({
            error: 'Unable to Retrieve Courses.'
        });
    }
});
//Endpoint to add a course
app.post('/courses', async (req, res) => {
    try{
        const { id, name } = req.body;
        if (!id?.trim() || !name?.trim()){
            return res.status(400).json({
                error: 'Course ID and Name are Required.'
            });
        }
        const existingCourse = await Course.findOne({
            id: id.trim()
        });
        if (existingCourse){
            return res.status(409).json({
                error: 'Course ID Already Exists.'
            });
        }
        const newCourse = await Course.create({
            id: id.trim(),
            name: name.trim()
        });
    } catch (error){
        console.error('Error Adding Course:', error);
        if (error.code === 11000){
            return res.status(409).json({
                error: 'Course ID Already Exists.'
            });
        }
        res.status(500).json({
            error: 'Internal Server Error.'
        });
    }
});
//Endpoint to delete a course
app.delete('/courses/:id', async (req, res) => {
    try {
        const deletedCourse = await Course.findOneAndDelete({
            id: req.params.id
        });
        if (!deletedCourse){
            return res.status(404).json({
                error: 'Course Not Found.'
            });
        }
        res.json({
            message: 'Course Deleted Successfully!'
        });
    } catch (error){
        console.error('Error deleting course:', error);
        res.status(500).json({
            error: 'Internal Server Error.'
        });
    }
});
// Enrollment Storage
app.get('/enrollments', async (req, res) => {
    try {
        const enrollments = await Enrollment.find();
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({
            error: 'Unable to Retrieve Enrollments.'
        });
    }
});
// Endpoint to retrieve all enrollments
app.get('/enrollments', (req, res) => {
    res.json(readEnrollments());
});
// Endpoint to enroll a student into a course
app.post('/enrollments', async (req, res) => {
    try{
        const { studentId, courseId } = req.body;
        if (!studentId || !courseId){
            return res.status(400).json({
                error: 'Student ID and Course ID are Required.'
            });
        }
        const studentExists = await Student.findOne({
            id: studentId
        });
        const courseExists = await Course.findOne({
            id: courseId
        });
        if (!studentExists){
            return res.status(404).json({
                error: 'Student Not Found.'
            });
        }
        if (!courseExists){
            return res.status(404).json({
                error: 'Course Not Found.'
            });
        }
        const duplicate = await Enrollment.findOne({
            studentId, courseId
        });
        if (duplicate){
            return res.status(409).json({
                error: 'Student is already enrolled in this course.'
            });
        }
        const newEnrollment = await Enrollment.create({
            studentId, courseId
        });
        res.status(201).json({
            message: 'Student Enrolled Successfully!',
            enrollment: newEnrollment
        });
    } catch (error){
        console.error('Error adding enrollment:', error);
        if (error.code === 11000){
            return res.status(409).json({
                error: 'Student is already enrolled in this course.'
            });
        }
        res.status(500).json({
            error: 'Internal Server Error.'
        });
    }
});
// Endpoint to remove an enrollment
app.delete('/enrollments/:studentId/:courseId', async (req, res) => {
    try{
        const { studentId, courseId } = req.params;
        const deletedEnrollment = await Enrollment.findOneAndDelete({
            studentId, courseId
        });
        if (!deletedEnrollment){
            return res.status(404).json({
                error: 'Enrollment Not Found.'
            });
        }
        res.json({
            message: 'Enrollment Removed Successfully!'
        });
    } catch (error){
        console.error('Error deleting enrollment: ', error);
        res.status(500).json({
            error: 'Internal Server Error.'
        });
    }
});
// Start the server
const PORT = process.env.PORT || 3001;

async function startServer(){
    try{
        await connectDB();
        //initialize database collections and indexes
        await Student.init();
        await Course.init();
        await Enrollment.init();
        console.log('Database has been initialized successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error){
        console.error('Server startup failed:', error);
        process.exit(1);
    }
}
startServer();