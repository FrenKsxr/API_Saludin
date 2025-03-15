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

module.exports = router;