


/*const cron = require('node-cron');
const { Op } = require('sequelize');
const alarm = require('../model/alarmsModel');
const accountSid = 'AC8fcc849315bc5561c233c48f5f42564d';
const authToken = '656c9af0dee8e31759d7ceb19e5a2c3b'; // Reemplázalo con tu Auth Token real
const client = require('twilio')(accountSid, authToken);

// Función para enviar mensaje por WhatsApp
const sendWhatsAppMessage = async (alarm) => {
    try {
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886', // Número de Twilio
            contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e', // Si tienes una plantilla en Twilio
            contentVariables: `{"1":"${alarm.hour}:${alarm.minute}","2":"Toma tu pastilla"}`,
            to: 'whatsapp:+529995763974' // Número de destino
        });

        console.log(`Mensaje enviado: ${message.sid}`);
    } catch (error) {
        console.error('Error enviando mensaje:', error);
    }
};

// Programar el cron job para que se ejecute cada minuto
cron.schedule('* * * * *', async () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    try {
        // Buscar alarmas activas con la hora y minuto actuales
        const alarms = await alarm.findAll({
            where: {
                hour: currentHour,
                minute: currentMinute,
                active: 1
            }
        });

        // Si hay alarmas coincidentes, enviamos WhatsApp
        for (const a of alarms) {
            await sendWhatsAppMessage(a);
        }
    } catch (error) {
        console.error('Error verificando alarmas:', error);
    }
});

console.log('El cron job de alarmas está corriendo...');
*/

/*
const { sendWhatsAppMessage } = require('./whasa');
const cron = require('node-cron');

// Programar un mensaje a una hora específica
cron.schedule('* * * * *', () => { // A las 8:30 AM
    sendWhatsAppMessage('529995763974@c.us', '¡Es hora de tomar tu pastilla! 💊');
});

console.log('⏰ Cron job de alarmas activado...');
*/


const { sendWhatsAppMessage } = require('./whasa');
const cron = require('node-cron');
const alarmsService = require('../service/alarmsService'); // Importar el servicio para obtener las alarmas

// Instanciar el servicio de alarmas
const alarmService = new alarmsService();

// Programar el cron job para que corra cada minuto
cron.schedule('* * * * *', async () => { // Cada minuto
    const currentTime = new Date(); // Hora actual
    const currentHour = currentTime.getHours(); // Hora actual
    const currentMinute = currentTime.getMinutes(); // Minutos actuales

    // Obtener todas las alarmas activas de la base de datos
    const alarms = await alarmService.obtenerAlarm();

    // Filtrar las alarmas activas que coinciden con la hora actual
    alarms.forEach(alarm => {
        // Compara si la hora y el minuto de la alarma coinciden con la hora actual
        if (alarm.active === 1 && alarm.hour === currentHour && alarm.minute === currentMinute) {
            // Enviar mensaje de WhatsApp si la hora y minuto coinciden
            sendWhatsAppMessage('526622247422@c.us', `¡Es hora de tomar tu pastilla! 💊 - ${alarm.name}`);
        }
    });
});

console.log('⏰ Cron job de alarmas activado...');
