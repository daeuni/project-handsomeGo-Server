const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const pool = require('../../module/pool.js');

router.get('/', async (req, res) => {

    const ID = jwt.verify(req.headers.authorization);

    const getStampListQuery = 'SELECT p.*, s.stamp_status FROM stamp s JOIN place p on s.place_id = p.place_id where writer_id = 1';
    const getPlaceListQuery = 'SELECT * FROM place';

    //로그인 했을 경우
    if (ID != -1) {
        let getStampList = await pool.execute2(getStampListQuery, ID);

        if (!getStampList) {
            res.status(500).send({
                message: "Internel Server Error",
                data : null
            })
        } else {
            res.status(200).send({
                message: "Successful Get Stamp Status Data",
                data: getStampList
            });
        }
    }
    //로그인 하지 않았을 경우
    else {
        let getPlaceList = await pool.execute1(getPlaceListQuery);

        if (!getPlaceList) {
            res.status(500).send({
                message: "Internel Server Error",
                data : null
            })
        } else {
            res.status(200).send({
                message: "Successful Get Place Data",
                data: getPlaceList
            });
        }
    }

});

module.exports = router;