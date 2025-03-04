const alarm = require('../model/alarmsModel')

class alarmsService{

    async obtenerAlarm(){
        return alarm.findAll();
    }

    async obtenerAlarmId(Id){
        return alarm.findByPk(Id);
    }

    async crearAlarm(newAlarm){
        return alarm.create(newAlarm);
    }

    async actualizarAlarm(Id,newdata){
        const newalarm = await alarm.findByPk(Id);
        if(newalarm){
            const update= await alarm.update(newdata,{
                where: {id:Id}
            });
            if (update > 0){
                return alarm.findByPk(Id)
            };
        }

        console.log('No se dio plebi, fak :(');
    }

    async eliminarAlarm(Id){
        const alarms = await alarm.findByPk(Id);
        if (alarms) {
            return alarm.destroy({
                where: {id:Id}
            });
        } else {
            return null
        }
    }
    
};

module.exports = alarmsService;

