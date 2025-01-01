const express = require('express');
const { getAllComments, addComment, deleteComment } = require('../controller/CommentController');
const router = express.Router();

router.get('/comments', getAllComments);
router.post('/comment', addComment);
router.delete('/comment', deleteComment);

module.exports = router;