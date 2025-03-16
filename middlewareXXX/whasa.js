const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const router = express.Router();

let qrCodeBase64 = null;
let client = null;

// Función para inicializar el cliente
const initializeClient = () => {
    client = new Client({
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

    // Manejar la desconexión
    client.on('disconnected', (reason) => {
        console.log('🚫 Cliente desconectado:', reason);
        qrCodeBase64 = null; // Limpiar el QR anterior
        client.initialize(); // Reiniciar el cliente para generar un nuevo QR
    });

    // Inicialización del cliente
    client.initialize();
};

// Inicializar el cliente al cargar el módulo
initializeClient();

// Endpoint para obtener el QR en base64
router.get('/whatsapp/qr', (req, res) => {
    if (!qrCodeBase64) {
        return res.status(400).json({ error: 'QR no generado aún' });
    }
    res.json({ qr: qrCodeBase64 });
});

// Endpoint para reiniciar el QR
router.post('/whatsapp/reset', async (req, res) => {
    try {
        if (client) {
            await client.logout(); // Cerrar la sesión actual
            console.log('✅ Sesión de WhatsApp cerrada. Reiniciando...');
            initializeClient(); // Reiniciar el cliente
            res.json({ message: 'Sesión reiniciada. Escanea el nuevo QR.' });
        } else {
            res.status(400).json({ error: 'Cliente no inicializado' });
        }
    } catch (error) {
        console.error('🚨 Error al reiniciar la sesión:', error);
        res.status(500).json({ error: 'Error al reiniciar la sesión' });
    }
});

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