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
            data : null
        })
    } 
    else {
        res.status(200).send({
            message: "Successful Get Stamp Status Data",
            data: getStampList
        });
    }

});

//스탬프 조회
router.get('/:place_id', async (req, res) => {

    const ID = jwt.verify(req.headers.authorization);

    const place_id = req.params.place_id;

    const getStamp = 'SELECT p.place_id, p.place_name, p.place_category, p.place_pic, s.stamp_date, s.stamp_status FROM stamp s JOIN place p ON s.place_id = p.place_id where s.writer_id = ? AND s.place_id = ?';
    const getRank = 'SELECT * FROM place ORDER BY place_star DESC';

    if(ID == -1) {

        let getStampInfo = await pool.execute3(getStamp, ID, place_id);
        let getRankList = await pool.execute1(getRank);

        let object = {};
        object.place_id = getStampInfo[0].place_id;
        object.place_name = getStampInfo[0].place_name;
        object.place_category = getStampInfo[0].place_category;
        object.place_pic = getStampInfo[0].place_pic;
        object.stamp_date = getStampInfo[0].stamp_date;
        object.stamp_status = getStampInfo[0].stamp_status;

        for(i = 0; i < getRankList.length; i++) {
            if(place_id == getRankList[i].place_id) {
                object.rank = i+1;
                break;
            }
        }

        if (!getStampInfo) {
            res.status(500).send({
                message: "Internel Server Error",
                data : null
            })
        } 

        else {
            if(getStampInfo.length == 0) {
                object.status = "스탬프를 찍지 않았습니다."
            }
            else {
                object.status = "스탬프를 찍었습니다."
            }
            res.status(200).send({
                message: "Successful Get Stamp Data",
                data: object
            });
        }

    }

    else {
        res.status(401).send({
            message: "access denied",
            data : null
        });
    }

});

//스탬프 적립
router.post('/:place_id', async (req, res) => {

    const ID = jwt.verify(req.headers.authorization);

    const place_id = req.params.place_id;

    const getStamp = 'SELECT p.place_id, p.place_name, p.place_category, p.place_pic, s.stamp_date, s.stamp_status FROM stamp s JOIN place p ON s.place_id = p.place_id where s.writer_id = ? AND s.place_id = ?';
    const getRank = 'SELECT * FROM place ORDER BY place_star DESC';

    if(ID == -1) {

        let getStampInfo = await pool.execute3(getStamp, ID, place_id);
        let getRankList = await pool.execute1(getRank);

        if (!getStampInfo) {
            res.status(500).send({
                message: "Internel Server Error",
                data : null
            })
        } 

        else {
            res.status(201).send({
                message: "Successful Get Stamp Data",
                data: object
            });
        }

    }

    else {
        res.status(401).send({
            message: "access denied",
            data : null
        });
    }

});

module.exports = router;