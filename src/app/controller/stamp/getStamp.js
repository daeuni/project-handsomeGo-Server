const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const pool = require('../../module/pool.js');

router.get('/:writer_id',async(req,res)=> {
    let writer_id = req.params.writer_id;

    let getStampListQuery = 'SELECT stamp_status FROM stamp WHERE writer_id = ? ORDER BY space_id DESC';
    let getStampList = await debug.queryParam_Arr(getStampListQuery,[writer_id]);

    if(!getStampList){
        res.status(500).send({
            msg : "Internel Server Error"
        })
    }else{
        res.status(200).send({
            msg : "Successful Get Stamp Status Data",
            data : getStampList
        });
    }
});

module.exports = router;