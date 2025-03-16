const express = require('express');
const router = express.Router();
const { generateQR } = require('../controller/whatsappController');

/**
 * @swagger
 * /whatsapp/qr:
 *   get:
 *     summary: Obtener el código QR para iniciar sesión en WhatsApp
 *     description: Devuelve una imagen PNG del código QR que puede ser escaneada con WhatsApp.
 *     tags: [WhatsApp]
 *     produces:
 *       - image/png
 *     responses:
 *       200:
 *         description: Imagen PNG del código QR
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Error al generar el código QR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al generar el código QR
 */
router.get('/whatsapp/qr', generateQR);



/**
 * @swagger
 * /whatsapp/reset:
 *   post:
 *     summary: Reiniciar la sesión de WhatsApp y generar un nuevo código QR
 *     description: Cierra la sesión actual de WhatsApp y genera un nuevo código QR para escanear con una cuenta diferente.
 *     tags: [WhatsApp]
 *     responses:
 *       200:
 *         description: Sesión reiniciada correctamente. Escanea el nuevo código QR.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sesión reiniciada. Escanea el nuevo QR.
 *       400:
 *         description: Error si el cliente no está inicializado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Cliente no inicializado
 *       500:
 *         description: Error al reiniciar la sesión.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al reiniciar la sesión
 */
router.post('/whatsapp/reset', async (req, res) => {
    try {
        if (client) {
            await client.logout(); // Cerrar la sesión actual
            console.log('✅ Sesión de WhatsApp cerrada. Reiniciando...');
            res.json({ message: 'Sesión reiniciada. Escanea el nuevo QR.' });
        } else {
            res.status(400).json({ error: 'Cliente no inicializado' });
        }
    } catch (error) {
        console.error('🚨 Error al reiniciar la sesión:', error);
        res.status(500).json({ error: 'Error al reiniciar la sesión' });
    }
});

module.exports = router;