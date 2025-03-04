const alarmService = require ('../service/alarmsService');
const alarmController = require('../controller/alarmsController');
const express = require ('express');
const router = express.Router();

const service = new alarmService();
const controller = new alarmController(service)

/**
 * @swagger
 * components:
 *   schemas:
 *     Alarm:
 *       type: object
 *       required:
 *         - hour
 *         - minute
 *         - name
 *         - active
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la alarma (autoincremental)
 *         hour:
 *           type: integer
 *           description: Hora de la alarma (0-23)
 *         minute:
 *           type: integer
 *           description: Minuto de la alarma (0-59)
 *         name:
 *           type: string
 *           description: Nombre de la alarma
 *         active:
 *           type: integer
 *           description: 1 si está activa, 0 si está inactiva
 *       example:
 *         id: 1
 *         hour: 8
 *         minute: 30
 *         name: "Despertar"
 *         active: 1
 */

/**
 * @swagger
 * /alarms:
 *   get:
 *     summary: Obtener todas las alarmas
 *     tags: [Alarms]
 *     responses:
 *       200:
 *         description: Lista de todas las alarmas registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alarm'
 */
router.get("/alarms", (req, res) => controller.obtenerAlarm(req, res));

/**
 * @swagger
 * /alarm/{id}:
 *   get:
 *     summary: Obtener una alarma por ID
 *     tags: [Alarms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la alarma a buscar
 *     responses:
 *       200:
 *         description: Alarma encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alarm'
 *       404:
 *         description: Alarma no encontrada
 */
router.get("/alarm/:id", (req, res) => controller.obtenerAlarmId(req, res));

/**
 * @swagger
 * /alarm:
 *   post:
 *     summary: Crear una nueva alarma
 *     tags: [Alarms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alarm'
 *     responses:
 *       201:
 *         description: Alarma creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alarm'
 *       400:
 *         description: Datos inválidos enviados
 */
router.post("/alarm", (req, res) => controller.crearAlarm(req, res));

/**
 * @swagger
 * /alarm/{id}:
 *   put:
 *     summary: Actualizar una alarma existente
 *     tags: [Alarms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la alarma a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alarm'
 *     responses:
 *       200:
 *         description: Alarma actualizada exitosamente
 *       404:
 *         description: Alarma no encontrada
 */
router.put("/alarm/:id", (req, res) => controller.actualizarAlarm(req, res));

/**
 * @swagger
 * /alarm/{id}:
 *   delete:
 *     summary: Eliminar una alarma
 *     tags: [Alarms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la alarma a eliminar
 *     responses:
 *       200:
 *         description: Alarma eliminada exitosamente
 *       404:
 *         description: Alarma no encontrada
 */
router.delete("/alarm/:id", (req, res) => controller.eliminarAlarm(req, res));

module.exports = router;