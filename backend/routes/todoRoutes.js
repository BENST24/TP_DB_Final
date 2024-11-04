// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/tasks', todoController.getTasks);
router.post('/tasks', todoController.createTask);
router.put('/tasks/:id/complete', todoController.completeTask);
router.put('/tasks/:id/activate', todoController.activateTask);
router.delete('/tasks/:id', todoController.deleteTask);

module.exports = router;
