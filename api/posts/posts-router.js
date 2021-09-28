const express = require('express');

const Post = require('./posts-model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch {
    res.status(500).json({
      "message":"The posts information could not be retrieved"
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const post = await Post.findById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        "message":"The post with the specified ID does not exist"
      });
    }
  } catch {
    res.status(500).json({
      "message":"The post information could not be retrieved"
    })
  }
});

module.exports = router;
