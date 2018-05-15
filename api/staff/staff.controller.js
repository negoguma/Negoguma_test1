const staff = require('../../databases');
const crypto = require('crypto');
const moment = require('moment');

exports.tokenLogin = (req, res) => {
    const tokens  = req.get('token');
    staff.Staff.findOne({
        where: {
            token : tokens
        }
    }).then( (findToken)=> {
        if( findToken ){
            crypto.randomBytes(64, (err, buf) => {
                crypto.pbkdf2(tokens, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
                    const regenerated_token = key.toString('base64');
                    staff.Staff.update(
                        { token : regenerated_token}, {where : {token :tokens }
                    })
                    .then( () => res.status(200).json({token:regenerated_token}))
                    .catch(()=> res.status(400).json({error:'fail'}));
                 });        
            });
        }else{
            return res.status(404).json({error:'bad token'})
        }        
    }).catch( () => {
        return res.status(400).json({error:'bad token'})
    })
}
exports.login = (req, res) => {
    const nickname = req.body.nickname || '';
    const password = req.body.password || '';
    const deviceInfomation = req.body.deviceInfomation || '';

    if( !nickname.length ){
        return res.status(400).json({error:'닉네임을 제대로 해줄래?'});
    }
    if( !password.length) {
        return res.status(400).json({error:'비밀번호를 제대로 해줄래?'});
    }
    if ( !deviceInfomation.length ){
        return res.status(400).json({error:'기기 정보가 입력되지 않았습니다.'})
    }

    staff.Staff.findOne({
        where: {
            nickname : nickname,
            password : crypto.createHash('sha512').update(password).digest('base64')
        }
    }).then(crew => {
        if( !crew ){
            return res.status(404).json({error:'Not Staff'});
        }else{
            crypto.randomBytes(64, (err, buf) => {
                crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
                    const token = key.toString('base64');
                    staff.Staff.update(
                        {token : token}, {where : {nickname :nickname }
                    })
                    .then( () => res.status(200).json({token:token}))
                    .catch(()=> res.status(400).json({error:'fail'}));
                 });        
            });
        }
    });    
};

exports.enroll = (req, res) =>{
    const nickname = req.body.nickname ||'';
    const password = req.body.password || '';
    
    const deviceInfomation = req.body.deviceInfomation ||'';
    if( !nickname.length || !password.length || !deviceInfomation.length ){
        return res.status(400).json({error:'Incorrect params'});
    };

    const phoneNumber = req.body.phoneNumber || '';
    const email = req.body.email || '';

    crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
            const token = key.toString('base64');
            staff.Staff.create({
                nickname : nickname,
                password : crypto.createHash('sha512').update(password).digest('base64'),
                token : token,
                // dateOfJoin : dateOfJoin,
                deviceInfomation : deviceInfomation,
                phoneNumber : phoneNumber,
                email : email
            }).then( (crew) => res.status(200).json({token:token}))
            .catch(()=> res.status(400).json({error:'fail'}));
         });        
    });  
};

exports.update = (req, res) => {
    res.send('//Staff 정보 수정');
};