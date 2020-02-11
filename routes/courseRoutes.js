const express = require('express');
const {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController');

const { protect, authorize } = require('../middlewares/authMiddleware');

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
    .post(protect, authorize('admin', 'publisher'), addCourse);

router
    .route('/:id')
    .get(getCourse)
    .put(protect, authorize('admin', 'publisher'), updateCourse)
    .delete(protect, authorize('admin', 'publisher'), deleteCourse);

module.exports = router;
