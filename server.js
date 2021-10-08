const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/auth-app'));

app.get('/*', (req, res) =>
    
    res.sendFile('index.html', {root: 'dist/auth-app/'}),
);

app.listen(process.env.PORT || 4200);