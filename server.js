const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const twilio = require('twilio');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.static('public'));

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const PHONE_NUMBER = process.env.PHONE_NUMBER;

const db = new sqlite3.Database('alarms.db');
db.serialize(() => {
  db.run('CREATE TABLE alarms (id INTEGER PRIMARY KEY AUTOINCREMENT, hour INTEGER, minute INTEGER, name TEXT, active INTEGER)');
});

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Authentication required');
  const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  if (username === 'admin' && password === 'pill1234') next();
  else res.status(401).send('Invalid credentials');
};

app.get('/api/alarms', (req, res) => {
  db.all('SELECT * FROM alarms', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows.map(row => ({
      id: row.id, 
      hour: row.hour,
      minute: row.minute,
      name: row.name,
      active: !!row.active
    })));
  });
});

app.post('/api/alarms', auth, (req, res) => {
  const { hour, minute, name, active } = req.body;
  if (!Number.isInteger(hour) || !Number.isInteger(minute) || !name ||
      hour < 0 || hour > 23 || minute < 0 || minute > 59 || name.length > 19) {
    return res.status(400).send('Invalid input');
  }

  db.get('SELECT COUNT(*) as count FROM alarms', (err, row) => {
    if (row.count >= 5) return res.status(400).send('Max alarms reached');
    
    db.run('INSERT INTO alarms (hour, minute, name, active) VALUES (?, ?, ?, ?)',
      [hour, minute, name, active ? 1 : 0], function(err) {
        if (err) return res.status(500).send(err);
        scheduleNotification(hour, minute, name);
        res.status(201).json({ id: this.lastID });
      });
  });
});

app.put('/api/alarms/:id', auth, (req, res) => {
  const { active } = req.body;
  db.run('UPDATE alarms SET active = ? WHERE id = ?', [active ? 1 : 0, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Alarm updated');
  });
});

app.delete('/api/alarms/:id', auth, (req, res) => {
  db.run('DELETE FROM alarms WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Alarm deleted');
  });
});

function scheduleNotification(hour, minute, name) {
  const now = new Date();
  let alarmTime = new Date();
  alarmTime.setHours(hour, minute - 5, 0, 0); // 5 minutos antes para SMS
  
  if (alarmTime <= now) alarmTime.setDate(alarmTime.getDate() + 1);

  const timeToAlarm = alarmTime - now;
  
  setTimeout(() => {
    client.messages.create({
      body: `Reminder: Take ${name} in 5 minutes!`,
      from: process.env.TWILIO_PHONE,
      to: PHONE_NUMBER
    }).catch(err => console.error(err));
    scheduleNotification(hour, minute, name); // Reschedule
  }, timeToAlarm);
}

db.all('SELECT * FROM alarms WHERE active = 1', (err, rows) => {
  rows.forEach(row => scheduleNotification(row.hour, row.minute, row.name));
});

app.listen(3000, () => console.log('Server running on port 3000'));
