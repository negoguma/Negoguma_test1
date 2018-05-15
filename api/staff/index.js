const express = require('express');
const router = express.Router();
const controller = require('./staff.controller');

//Staff 로그인 
router.post('/', controller.login);
router.post('/auto', controller.tokenLogin);

//Staff 등록
router.post('/enroll', controller.enroll);

//Staff 정보 수정
router.put('/:id', controller.update);

module.exports = router;
