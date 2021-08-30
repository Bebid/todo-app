const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'todo-app',
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/users', (oRequest, oResult) => {
    const sQuery = 'SELECT id FROM users';
    db.query(sQuery, (oError, oQueryResult) => {
        oResult.send(oQueryResult);
    });
});

app.post('/api/users/:userId', (oRequest, oResult) => {
    const sId = oRequest.params.id;
    const sQuery = 'INSERT INTO users (id) VALUES (?)';
    db.query(sQuery, [sId], (oError, oQueryResult) => {
        oResult.send(oQueryResult);
    });
});

app.get('/api/todos/:userId', (oRequest, oResult) => {
    const sUserId = oRequest.params.userId;
    const sQuery = 'SELECT * FROM todos WHERE user_id=?';
    db.query(sQuery, [sUserId], (oError, oQueryResult) => {
        oResult.send(oQueryResult);
    });
});

app.delete('/api/todos/:id', (oRequest, oResult) => {
    const sId = oRequest.params.id;
    const sQuery = 'DELETE FROM todos WHERE id=?';
    db.query(sQuery, [sId], (oError, oQueryResult) => {
        oResult.send(oQueryResult);
    });
});

app.put('/api/todos', (oRequest, oResult) => {
    const sStatus = oRequest.body.status;
    const sId = oRequest.body.id;
    const sQuery = 'UPDATE todos SET status=? WHERE id=?';
    db.query(sQuery, [sStatus, sId], (oError, oQueryResult) => {
        oResult.send(oQueryResult);
    });
});

app.post('/api/todos/insert', (oRequest, oResult) => {
    const sText = oRequest.body.text;
    const sStatus = oRequest.body.status;
    const sUserId = oRequest.body.user_id;
    const sQuery = 'INSERT INTO todos (text, status, user_id) VALUES (?, ?, ?)';
    db.query(sQuery, [sText, sStatus, sUserId], (oError, oQueryResult) => {
        oResult.send(oQueryResult);
    });
});

app.listen(3001, () => {
    console.log('running on port 3001');
});
