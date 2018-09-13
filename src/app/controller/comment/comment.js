const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const pool = require('../../module/pool.js');
const upload = require('../../../config/multer');

let multiUpload = upload.fields(
    [
        {
            name: 'pictures'
        }
    ]
);

//댓글 세부 조회
router.get('/:comment_id', async (req, res) => {

    const place_id = req.params.comment_id;

    const getComment = 'SELECT w.writer_name, c.* FROM comment c JOIN writer w ON c.writer_id = w.writer_id WHERE c.comment_id = ?';

    let getCommentInfo = await pool.execute2(getComment, place_id);

    if (!getCommentInfo) {
        res.status(500).send({
            message: "Internel Server Error",
            data: null
        })
    }
    else {
        if (getCommentInfo.length == 0) {
            res.status(404).send({
                message: "Not Found Comment Data",
                data: null
            });
        } else {
            res.status(200).send({
                message: "Successful Get Comment Data",
                data: getCommentInfo
            });
        }
    }

});

//댓글 작성
router.post('/', multiUpload, async (req, res) => {

    const ID = jwt.verify(req.headers.authorization);

    const insertCommentQuery = 'INSERT INTO comment SET ?'
    const getMyCommentQuery = 'SELECT * FROM comment WHERE writer_id = ? AND place_id = ?'

    let data = {};

    if (ID != -1) {

        let getMyComment = await pool.execute3(getMyCommentQuery, ID, req.body.place_id);
        if (getMyComment.length == 1) {
            res.status(200).send({
                message: "Already Post Comment",
                data: null
            })
        }
        else {
            data.writer_id = ID;
            data.place_id = req.body.place_id;
            data.comment_star = req.body.star;
            data.comment_comment = req.body.comments;
            data.comment_date = new Date();
            
            if (req.files.pictures.length == 1) {
                data.comment_pic1 = req.files.pictures[0].location ? req.files.pictures[0].location : null;
            }
            else if (req.files.pictures.length == 2) {
                data.comment_pic1 = req.files.pictures[0].location ? req.files.pictures[0].location : null;
                data.comment_pic2 = req.files.pictures[1].location ? req.files.pictures[1].location : null;
            }
            else if (req.files.pictures.length == 3) {
                data.comment_pic1 = req.files.pictures[0].location ? req.files.pictures[0].location : null;
                data.comment_pic2 = req.files.pictures[1].location ? req.files.pictures[1].location : null;
                data.comment_pic3 = req.files.pictures[2].location ? req.files.pictures[2].location : null;
            }
            else {
                data.comment_pic1 = req.files.pictures[0].location ? req.files.pictures[0].location : null;
                data.comment_pic2 = req.files.pictures[1].location ? req.files.pictures[1].location : null;
                data.comment_pic3 = req.files.pictures[2].location ? req.files.pictures[2].location : null;
                data.comment_pic4 = req.files.pictures[3].location ? req.files.pictures[3].location : null;
            }

            let result = await pool.execute2(insertCommentQuery, data);

            if (!result) {
                res.status(500).send({
                    message: "Internel Server Error",
                    data: null
                })
            }
            else {
                res.status(201).send({
                    message: "Successful Post Comment",
                    data: null
                })
            }
        }
    } else {
        res.status(403).send({
            message: 'Access Denied'
        });
    }
});


module.exports = router;