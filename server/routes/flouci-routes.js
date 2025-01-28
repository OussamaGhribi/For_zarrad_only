const express = require("express");
const router = express.Router();
const FlouciController = require('../controllers/flouci');

router.post('/add', FlouciController.Add);
router.get('/verify/:id', FlouciController.Verify);
router.get('/earnings', FlouciController.GetEarnings);

module.exports = router;
