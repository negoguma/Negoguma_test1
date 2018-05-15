const attendance = require('../../databases');
const moment = require('moment');

exports.show = (req, res) => {
    const token = req.get('token');
    if( token ){
        attendance.Staff.findOne({
            where :{ 
                token : token
            }
        }).then( ()=> {
            attendance.Attendance.findAll({
                where:{
                    date : moment(new Date()).format('YYYY-MM-DD')
                }
            })
            .then(attendanceList => {
                if( !attendanceList.length ){
                    return res.status(404).json({error:'Not List'});
                }else{
                    return res.status(200).json({result:attendanceList});
                }
            });    
        })
        .catch( ()=>{
            return res.status(400).json({error : 'bad token'});
        });
        
    }    
};

exports.showOne = (req, res) => {
    const token = req.get('token');
    if( token ){
        const nickname = req.params.nickname;
        if( !nickname.length ){
            return res.status(400).json({error:'누구를 찾는거니~'});
        }
        attendance.Staff.findOne({
            where: {
                nickname: nickname
            }
        }).then( (staff) => {
            if( !staff ){
                return res.status(404).json({error:'Not List'});
            }else{
                attendance.Attendance.findAll({
                    where:{
                        staff_id : staff.id
                    }
                }).then( (list)=>{
                    if( list ){
                        return res.status(200).json(list);
                    }
                });
            }
        });    
    }    
};

exports.enroll = (req, res) =>{
    const token = req.get('token');    
    if ( token ){
        attendance.Staff.findOne({
            where: {
                token : token
            }
        }).then((staff)=>{
            if( staff ){
                attendance.Attendance.findOne({
                    where: {
                        staff_id : staff.id,
                        date : moment(new Date()).format('YYYY-MM-DD')
                    }
                }).then(( already )=> {
                    if( already ){
                        return res.status(404).json({error: 'already attendance'})                    
                    }else{
                        attendance.Attendance.create({
                            staff_id : staff.id,
                            date : moment(new Date()).format('YYYY-MM-DD'),
                            time : moment(new Date()),
                        }).then( () => res.status(200).json({success : '출근'}) )
                    }
                });
            }          
        });
    }else{
        res. status(404).json({error: '누구냐? 넌!'});
    }
};
