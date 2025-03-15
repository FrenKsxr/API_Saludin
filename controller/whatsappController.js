const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { client } = require('../middlewareXXX/whasa');

let qrCodeText = '';

client.on('qr', (qr) => {
    qrCodeText = qr;
});

const generateQR = async (req, res) => {
    try {
        // 1. Asegurar la carpeta /public/qrcodes
        const qrDirectory = path.join(__dirname, '../../public/qrcodes');
        if (!fs.existsSync(qrDirectory)) {
            fs.mkdirSync(qrDirectory, { recursive: true });
        }

        // 2. Generar un nonce aleatorio
        const nonce = crypto.randomBytes(8).toString('hex');

        // 3. El contenido del QR incluye el texto generado por WhatsApp Web
        const qrContent = qrCodeText || `nonce:${nonce}`;

        // 4. Nombre de archivo con timestamp
        const timestamp = Date.now();
        const qrFilePath = path.join(qrDirectory, `qr_${timestamp}.png`);

        // 5. Generar QR y guardarlo en un .png
        await QRCode.toFile(qrFilePath, qrContent, {
            width: 256,
            margin: 2,
            errorCorrectionLevel: 'H',
        });

        // 6. Enviar la imagen al cliente
        res.sendFile(qrFilePath);
    } catch (error) {
        console.error('🚨 Error al generar el código QR:', error);
        res.status(500).json({ message: 'Error al generar el código QR' });
    }
};

module.exports = { generateQR };