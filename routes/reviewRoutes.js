const express = require('express');

const {
    getReviews,
    getReview,
    addReview,
    updateReview,
    deleteReview
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
    .post(protect, authorize('user', 'admin'), addReview);

router
    .route('/:id')
    .get(getReview)
    .put(protect, authorize('user', 'admin'), updateReview)
    .delete(protect, authorize('user', 'admin'), deleteReview);


module.exports = router;


