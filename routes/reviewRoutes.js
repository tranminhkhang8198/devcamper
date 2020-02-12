const express = require('express');

const {
    getReviews,
    getReview
} = require('../controllers/reviewController');

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/authMiddleware');

const Review = require('../models/reviewModel');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(
        advancedResults(Review, {
            path: 'bootcamp',
            select: 'name description'
        }),
        getReviews
    )

router
    .route('/:id')
    .get(getReview);


module.exports = router;


