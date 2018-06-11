const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const logger = require('morgan');


const app = express();

const api = require('./routes/api');

app.use( (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type');
	next();
});

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/api', api);


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || '8080';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Сервер запущен на localhost:${port}`));