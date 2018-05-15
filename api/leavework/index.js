const express = require('express');
const router = express.Router();
const controller = require('./leavework.controller');

//출근 확인
router.get('/', controller.show);
router.get('/:nickname', controller.showOne);

//출근 등록
router.post('/enroll', controller.enroll);

module.exports = router;
