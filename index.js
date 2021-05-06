'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const studentRoutes = require('./routes/student-routes');
const shopsRoutes = require('./routes/shops-routes');
const dishsRoutes = require('./routes/dish-routes');
const boxsRoutes = require('./routes/box-routes');
const commentsRoutes = require('./routes/comment-routes');


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', studentRoutes.routes);
app.use('/api',shopsRoutes.routes);
app.use('/api',boxsRoutes.routes);
app.use('/api',dishsRoutes.routes);
app.use('/api',commentsRoutes.routes);




app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
