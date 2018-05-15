const Sequelize = require('sequelize');
const sequelize = new Sequelize('afi_crew_commute', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    timezone: '+09:00'
});

const Staff = sequelize.define('staff',{
    // staffName: {
    //     type: Sequelize.STRING,
    //     allowNull : false
    // },
    password : {
        type: Sequelize.STRING,
        allowNull : false
    },
    phoneNumber: Sequelize.STRING,
    nickname : {
        type : Sequelize.STRING,
        unique : true,
        allowNull : false
    },
    email: Sequelize.STRING,
    // dateOfJoin : {
    //     type : Sequelize.DATE,
    //     allowNull : false
    // },
    deviceInfomation : {
        type :Sequelize.STRING,
        allowNull : false
    },
    token : {
        type : Sequelize.STRING,
        allowNull : false
    }
});


const Attendance = sequelize.define('attendance',{
    date :{
        type: Sequelize.DATEONLY,
        allowNull : false
    },
    time :{
        type : Sequelize.DATE,
        allowNull : false,
    },
    // isAm :{
    //     type : Sequelize.BOOLEAN,
    //     allowNull : false,
    // }
});

const LeaveWork = sequelize.define('leavework',{
    date :{
        type: Sequelize.DATEONLY,
        allowNull : false
    },
    time :{
        type : Sequelize.DATE,
        allowNull : false
    },
    // isAm :{
    //     type : Sequelize.BOOLEAN,
    //     allowNull : false,
    // }
});

const Vacation = sequelize.define('vacation',{
    isHalf : {
        type : Sequelize.BOOLEAN,
        allowNull : false
    },
    inDate : {
        type : Sequelize.DATEONLY,
        allowNull : false
    },
    remainingVacation : {
        type : Sequelize.INTEGER,
        allowNull : false
    }
});

const Overtime = sequelize.define('overtime',{
    reasonOfOvertime : {
        type : Sequelize.STRING,
        allowNull : false
    } 
})

Attendance.belongsTo(Staff, {foreignKey: 'staff_id'});
LeaveWork.belongsTo(Staff, {foreignKey: 'staff_id'});
Vacation.belongsTo(Staff, {foreignKey: 'staff_id'});
Overtime.belongsTo(Staff, {foreignKey: 'staff_id'});

module.exports = {
    sequelize : sequelize,
    Staff : Staff,
    Attendance : Attendance,
    LeaveWork : LeaveWork,
    Vacation : Vacation,
    Overtime : Overtime
}