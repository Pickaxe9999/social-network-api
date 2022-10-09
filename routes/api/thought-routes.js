const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    getThoughtById,
    deleteThought,
    addReaction,
    removeReaction,
    updateThought
  } = require('../../controllers/thought-controller');

// Set up GET all posts /api/thought
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// Set up GET one and DELETE at /api/thought/:id
router
  .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// Set up POST and DELETE routes for reactions on comments
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction)

module.exports = router;