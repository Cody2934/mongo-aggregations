const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/cars', require('./routes/cars'));
app.use('/api/v1/enjoyments', require('./routes/enjoyments'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
