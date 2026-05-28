const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');

router.post('/plan-tasks', plannerController.planTasks);

module.exports = router;
