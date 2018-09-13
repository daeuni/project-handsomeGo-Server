const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');

//회원가입 
router.post('/', async (req, res, next) => {

    const QUERY = 'insert into USER set ?';
    let newUser = signup.new(req.body);
    let inserted = await db.execute2(QUERY, newUser);

    if (inserted == undefined) {
        res.status(405).send({
            message: 'please check email'
        });
    } else {
        await myIntro.create({
            user_idx: inserted.insertId,
            intro_contents: "",
            intro_img_url: []
        });
        res.status(201).send({
            message: "success"
        });
    }
});

module.exports = router;
