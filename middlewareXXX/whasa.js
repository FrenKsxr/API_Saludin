const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const router = express.Router();  // Asegúrate de que sea un router de Express
let qrCodeBase64 = null; // Variable para almacenar el QR en base64

const client = new Client({
    authStrategy: new LocalAuth()
});

// Generar el QR y guardarlo en base64
client.on('qr', async qr => {
    console.log('Escanea este código QR con tu WhatsApp:');
    qrCodeBase64 = await qrcode.toDataURL(qr); // Guardar QR como base64
});

// Confirmar que el bot está listo
client.on('ready', () => {
    console.log('✅ Bot de WhatsApp está listo!');
});

// Endpoint para obtener el QR en base64
router.get('/whatsapp/qr', (req, res) => {
    if (!qrCodeBase64) {
        return res.status(400).json({ error: 'QR no generado aún' });
    }
    res.json({ qr: qrCodeBase64 });
});

// Inicialización del cliente
client.initialize();

// Función para enviar un mensaje de WhatsApp
const sendWhatsAppMessage = async (number, message) => {
    try {
        const numberId = await client.getNumberId(number);
        if (!numberId) {
            console.error(`❌ Número inválido o no registrado en WhatsApp: ${number}`);
            return;
        }
        await client.sendMessage(numberId._serialized, message);
        console.log(`✅ Mensaje enviado a ${number}: ${message}`);
    } catch (error) {
        console.error(`❌ Error enviando mensaje:`, error);
    }
};

// Exportar el cliente, la función y el router
module.exports = { sendWhatsAppMessage, client, router };
