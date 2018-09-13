const express = require('express');
const router = express.Router();

//login
const login = require('./login');
router.use('/login', login);

//임시 로그인
const temp = require('./temp');
router.use('/temp', temp);

module.exports = router;
