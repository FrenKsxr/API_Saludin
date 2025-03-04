const alarm = require('../model/alarmsModel')

class alarmsService{

    async obtenerAlarm(){
        return alarm.findAll();
    }

    async obtenerAlarmId(Id){
        return alarm.findByPk(Id);
    }

    async crearAlarm(newAlarm) {
        newAlarm.fecha_inicio = new Date(newAlarm.fecha_inicio);
        return alarm.create(newAlarm);
    }

    async actualizarAlarm(Id, newData) {
        const existingAlarm = await alarm.findByPk(Id);
        if (!existingAlarm) {
            console.log('La alarma no existe.');
            return null;
        }

        if (newData.fecha_inicio) {
            newData.fecha_inicio = new Date(newData.fecha_inicio);
        }

        await alarm.update(newData, { where: { id: Id } });
        return alarm.findByPk(Id); 
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

