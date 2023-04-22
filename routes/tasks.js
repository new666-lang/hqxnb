const express = require('express');
const router = express.Router();
const Task = require('../Task');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('createdBy');
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  const { title, description, createdBy } = req.body;

  try {
    const task = new Task({ title, description, createdBy });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
