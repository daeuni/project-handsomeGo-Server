const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const pool = require('../../module/pool.js');

router.get('/', async (req, res) => {

    const ID = jwt.verify(req.headers.authorization);

    const getStampListQuery = 'SELECT p.place_id, p.place_name, p.place_address, p.place_star, p.place_pic, s.stamp_status FROM stamp s JOIN place p on s.place_id = p.place_id where s.writer_id = ?';

    let getStampList = await pool.execute2(getStampListQuery, ID);

    if (!getStampList) {
        res.status(500).send({
            message: "Internel Server Error",
            data: null
        })
    }
    else {
        res.status(200).send({
            message: "Successful Get Stamp Status Data",
            data: getStampList
        });
    }

});

module.exports = router;