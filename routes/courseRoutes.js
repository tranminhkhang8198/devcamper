const express = require('express');
const {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController');

const { protect } = require('../middlewares/authMiddleware');

const Course = require('../models/courseModel');
const advancedResults = require('../middlewares/advancedResults');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(
        advancedResults(Course, {
            path: 'bootcamp',
            select: 'name description'
        }),
        getCourses
    )
    .post(protect, addCourse);

router
    .route('/:id')
    .get(getCourse)
    .put(protect, updateCourse)
    .delete(protect, deleteCourse);

module.exports = router;
