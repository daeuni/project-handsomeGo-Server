const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const pool = require('../../module/pool.js');

//댓글 세부 조회
router.get('/:comment_id', async (req, res) => {

    const place_id = req.params.comment_id;

    const getComment = 'SELECT w.writer_name, c.* FROM comment c JOIN writer w ON c.writer_id = w.writer_id WHERE c.comment_id = ?';

    let getCommentInfo = await pool.execute2(getComment, place_id);

    if (!getRankList) {
        res.status(500).send({
            message: "Internel Server Error",
            data : null
        })
    } 
    else {
        res.status(200).send({
            message: "Successful Get Comment Data",
            data: getCommentInfo
        });
    }

});

//댓글 작성
router.post('/', async (req, res) => {

    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1) {

    }else {
        res.status(403).send({
            message: 'Access Denied'
        });
    }

    const getComment = 'SELECT w.writer_name, c.* FROM comment c JOIN writer w ON c.writer_id = w.writer_id WHERE c.comment_id = ?';

    let getCommentInfo = await pool.execute2(getComment, place_id);

    if (!getRankList) {
        res.status(500).send({
            message: "Internel Server Error",
            data : null
        })
    } 
    else {
        res.status(200).send({
            message: "Successful Get Comment Data",
            data: getCommentInfo
        });
    }

});


module.exports = router;