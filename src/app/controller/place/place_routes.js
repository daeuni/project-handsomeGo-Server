const express = require('express');
const router = express.Router();

//장소 조회
const place = require('./place');
router.use('/place', place);

module.exports = router;
