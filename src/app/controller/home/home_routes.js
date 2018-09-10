const express = require('express');
const router = express.Router();

//home 
const signup = require('./home');
router.use('/home', home);

module.exports = router;
