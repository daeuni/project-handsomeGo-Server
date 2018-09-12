// 각종 라우팅을 연결하는 코드
const express = require('express');
const router = express.Router();

const place = require('./controller/place/place_routes');
router.use('/', place);

const rank = require('./controller/rank/rank_routes');
router.use('/', rank);

const user = require('./controller/user/user_routes');
router.use('/', user);

// const home = require('./controller/home/home_routes');
// router.use('/',home);

module.exports = router;
