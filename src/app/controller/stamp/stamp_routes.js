const express = require('express');
const router = express.Router();

//스탬프 조회
const stamp = require('./stamp');
router.use('/stamp', stamp);

module.exports = router;
