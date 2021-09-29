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
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const {title, contents} = req.body;
    if (!title || !contents) {
      res.status(400).json({
        "message":"Please provide title and contents for the post"
      });
    } else {
      const {id} = await Post.insert({title, contents});
      const post = await Post.findById(id);
      res.status(201).json(post);
    }
  } catch {
    res.status(500).json({
      "message":"There was an error while saving the post to the database"
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const postToEdit = await Post.findById(id);
    if (postToEdit) {
      const post = req.body;
      if (!post.title || !post.contents) {
        res.status(400).json({
          "message":"Please provide title and contents for the post"
        });
      } else {
        const editedPost = await Post.update(id, post);
        res.status(200).json({id: editedPost, ...post});
      }
    } else {
      res.status(404).json({
        "message":"The post with the specified ID does not exist"
      });
    }
  } catch {
    res.status(500).json({
      "message":"The post information could not be modified"
    })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const postToDelete = await Post.findById(id);
    if (postToDelete) {
      await Post.remove(id);
      res.status(200).json(postToDelete);
    } else {
      res.status(404).json({
        "message":"The post with the specified ID does not exist"
      });
    }
  } catch {
    res.status(500).json({
      "message":"The comments information could not be retrieved"
    })
  }
})

module.exports = router;
