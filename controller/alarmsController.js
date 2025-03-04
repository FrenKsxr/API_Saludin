class alarmController{
    constructor(alarmService){
        this.alarmService = alarmService
    }

    async obtenerAlarm(req,res){
        try {
            const alarm = await this.alarmService.obtenerAlarm();
            res.status(201).json(alarm)
        } catch (error) {
            console.error('Error en Controller, para obtener Alarmas plebe: ', error);
            res.status(500).json({message:'Tuvimos un error obteniendo alarmas :((', error: error.message})
            
        }
    }

    async obtenerAlarmId(req,res){
        try {
            const id = req.params.id;
            const alarm = await this.alarmService.obtenerAlarmId(id);
            if (alarm) {
                res.status(201).json(alarm);
            }else{
                res.status(404).json({message: 'No fue encontrada la Alarma, maybe la Id no existe chavalo'});
            }
            
        } catch (error) {
            console.error('Error al buscar por ID: ', error);
            res.status(501).json({message:'Tuvimos un error en la busqueda:', error:error.message})
        }
    }

    async crearAlarm(req, res){
        try {
            console.log(req.body);
            const newAlarm = req.body
            const alarm = await this.alarmService.crearAlarm(newAlarm);
            res.status(201).json(alarm);
        } catch (error) {
            console.error('Error al crear una nueva alarma: ', error);
            res.status(501).json({message:'Tuvimos un error en la creación de la alarma:', error:error.message})
        }
    }

    async actualizarAlarm(req,res){
        try {
            const id = req.params.id;
            const updateData = req.body
            const alarm = await this.alarmService.actualizarAlarm(id,updateData);
            if (alarm) {
                res.status(201).json(alarm);
            } else {
                res.status(404).json({message:'Hubo un error al momento de crear la alarma, chequea si existe w'})
            }
        } catch (error) {
            console.error('No se pudo actualizar los datos cwn: ', error);
            res.status(501).json({message:'Tuvimos un error en al actualizar:', error:error.message})
        }
    }

    async eliminarAlarm(req, res){
        try {
            const id = req.params.id
            const del =  await this.alarmService.eliminarAlarm(id);

            if (del) {
                res.status(201).json({message:'La alarma a sido eliminada'});
            } else {
                res.status(404).json({message:'Hubo un al buscar la alarma, busca si existe el Id Gei'})
            }
        } catch (error) {
            console.error('No se pudo eliminar LOL: ', error);
            res.status(501).json({message:'Tuvimos un error al eliminar AJDHAKJ:', error:error.message})
        }

    }
}

module.exports = alarmController