const twilio = require('twilio')

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const scheduleNotification = (hour, minute, name) => {
    const now = new Date();
    let alarmTime = new Date();
    alarmTime.setHours(hour, minute - 5, 0, 0); 

    if (alarmTime <= now) alarmTime.setDate(alarmTime.getDate() + 1);

    const timeToAlarm = alarmTime - now;

    console.log(` Notificación programada en ${timeToAlarm / 1000} segundos para ${name}`);

    setTimeout(() => {
        client.messages
            .create({
                body: `¡Recordatorio! Toma ${name} en 5 minutos.`,
                from: process.env.TWILIO_PHONE,
                to: process.env.PHONE_NUMBER
            })
            .then((message) => console.log(` Mensaje enviado: ${message.sid}`))
            .catch((err) => console.error(' Error enviando mensaje:', err));

        scheduleNotification(hour, minute, name); // Reprogramar
    }, timeToAlarm);
};

module.exports = {client,scheduleNotification}