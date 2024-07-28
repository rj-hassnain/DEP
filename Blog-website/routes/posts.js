const express = require('express');
const Post = require('../models/Post');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); 
    res.json(posts); 
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server Error' }); 
  }
});


router.post('/', async (req, res) => {
  const { title, body } = req.body; 

  if (!title || !body) {
    return res.status(400).json({ message: 'Please provide title and body' });
  }

  try {
    const newPost = new Post({ title, body }); 
    const savedPost = await newPost.save(); 
    res.json(savedPost); 
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server Error' }); 
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    const post = await Post.findById(id); 
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post); 
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Server Error' }); 
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  const update = { title, body }; 

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, update, { new: true }); 
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost); 
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server Error' }); 
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(id); 
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted' }); 
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server Error' }); 
  }
});

module.exports = router;
