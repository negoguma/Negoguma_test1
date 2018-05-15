const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/staff', require('./api/staff'));
app.use('/attendance', require('./api/attendance'))
app.use('/leavework', require('./api/leavework'))
// app.use('/vacation', require('./api/vacation'))

// router.get('/', (req, res) => {
//     res.send('AFI');
// });


// //출근 시간 등록
// app.post('/attendance/enroll:id', (req, res)=>{
//     res.send('//출근 시간 등록');
// });

// //출근시간 확인
// app.get('/attendance/:id', (req, res)=>{
//     const id = parseInt(req.params.id, 10);
//     if( !id ){
//         return res.status(400).json({error: 'Incorrect staff'});
//     }
//     let user = users.filter(user => user.id === id)[0];
//     if( !user ){
//         return res.status(404).json({error: 'Unknown staff'});
//     }    
//     return res.json(user);
// })

// //지각 여부 체크
// //지각 회수 계산


// //퇴근 시간 등록
// app.post('/leave/enroll', (req, res)=>{
//     res.send('//퇴근 시간 등록');
// });
// //휴가 등록
// app.post('/vacation/enroll', (req, res)=>{
//     res.send('//휴가 등록');
// });
// //반차, 월차 기록

// //휴가 취소
// app.delete('/vacation', (req, res)=>{

//     res.send('//휴가 취소');
// });

// //휴가 완료
// app.put('/vacation', (req, res)=>{
//     res.send('//휴가 완료');
// })

//남은 휴가 일수 계산

module.exports = app;

// app.listen( 3000, () =>{
//     console.log('Example app listening on port 3000');

//     //force true->서버가 구동되면 디비를 초기화
//     //force false->서버가 구동되도 디비 초기화 하지 않음

//     require('./databases').sequelize.sync({force: true})
//     .then(()=>{
//         console.log( 'Databases sync');
//     })
// });
