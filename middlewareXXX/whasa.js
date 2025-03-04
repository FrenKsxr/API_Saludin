const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Crear cliente de WhatsApp con autenticación local
const client = new Client({
    authStrategy: new LocalAuth()  // Guarda sesión para no escanear QR siempre
});

// Escanear el código QR la primera vez
client.on('qr', qr => {
    console.log('Escanea este código QR con tu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Confirmar que el bot está listo
client.on('ready', () => {
    console.log('✅ Bot de WhatsApp está listo!');
});

// Función para enviar un mensaje de WhatsApp
async function sendWhatsAppMessage(number, message) {
    try {
        const numberId = await client.getNumberId(number); // Verifica si existe en WhatsApp
        if (!numberId) {
            console.error(`❌ Número inválido o no registrado en WhatsApp: ${number}`);
            return;
        }

        await client.sendMessage(numberId._serialized, message);
        console.log(`✅ Mensaje enviado a ${number}: ${message}`);
    } catch (error) {
        console.error(`❌ Error enviando mensaje:`, error);
    }
}


// Iniciar el cliente
client.initialize();

// Exportar la función para usar en otros archivos
module.exports = { sendWhatsAppMessage };
