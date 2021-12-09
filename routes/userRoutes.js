const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');

router.post('/a', user.register);
router.get('/b', user.getAll);
router.get('/c/:id', user.getOne);
router.put('/d/:id', user.update);
router.delete('/e/:id', user.delete);

module.exports = router;
