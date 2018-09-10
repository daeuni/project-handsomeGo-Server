const express = require('express');
const router = express.Router();

//스탬프 조회
const getStamp = require('./getStamp');
router.use('/', getStamp);

module.exports = router;
