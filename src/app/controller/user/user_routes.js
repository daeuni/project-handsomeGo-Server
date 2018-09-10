const express = require('express');
const router = express.Router();

//signup
const signup = require('./signup');
router.use('/signup', signup);

//login
const login = require('./login');
router.use('/login', login);

module.exports = router;
