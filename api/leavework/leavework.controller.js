const leavework = require('../../databases');
const moment = require('moment');

exports.show = (req, res) => {
    const token = req.get('token');
    if( token ){
        leavework.Staff.findOne({
            where :{ 
                token : token
            }
        }).then( ()=> {
            leavework.LeaveWork.findAll({
                where:{
                    date : moment(new Date()).format('YYYY-MM-DD')
                }
            })
            .then(leaveworkList => {
                if( !leaveworkList.length ){
                    return res.status(404).json({error:'Not List'});
                }else{

                console.log(leaveworkList)
                    return res.status(200).json({result:leaveworkList});
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
        leavework.Staff.findOne({
            where: {
                nickname: nickname
            }
        }).then( (staff) => {
            if( !staff ){
                return res.status(404).json({error:'Not List'});
            }else{
                leavework.LeaveWork.findAll({
                    where:{
                        staff_id : staff.id
                    }
                }).then( (list)=>{
                    if( list ){
                        return res.status(200).json({result:list});
                    }
                });
            }
        });    
    }    
};

exports.enroll = (req, res) =>{
    const token = req.get('token');    
    if ( token ){
        leavework.Staff.findOne({
            where: {
                token : token
            }
        }).then((staff)=>{
            if( staff ){
                leavework.LeaveWork.findOne({
                    where: {
                        staff_id : staff.id,
                        date : moment(new Date()).format('YYYY-MM-DD')
                    }
                }).then(( already )=> {
                    if( already ){
                        //TODO 출근시간 + 09:00 이상이 현재 시간이어야 퇴근 처리가 가능하다.
                        // const cl = moment(already.time , 'YYYY-MM-DD:hh:mm:ss').diff( moment(new Date()), 'hour'); 
                        return res.status(404).json({error: 'already leave work'})                    
                    }else{
                        leavework.Attendance.findOne({
                            where:{
                                staff_id : staff.id
                            }
                        }).then( (staff_attendance)=>{
                            if( staff_attendance ){
                                console.log(moment(staff_attendance.time));
                                const diff_time = moment(staff_attendance.time , 'YYYY-MM-DD:hh:mm:ss').diff( moment(new Date()), 'hour'); 
                                if( diff_time >= 9){
                                    leavework.LeaveWork.create({
                                        staff_id : staff.id,
                                        date : moment(new Date()).format('YYYY-MM-DD'),
                                        time : moment(new Date()),
                                    }).then( () => res.status(200).json({success : '퇴근'}) );
                                }                            
                            }else{
                                return res.status(404).json({error:'출근한적 없자나'});
                            }
                        });                       
                    }
                });
            }          
        });
    }else{
        res. status(404).json({error: '누구냐? 넌!'});
    }
};
