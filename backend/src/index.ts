require('./models/User');
require('./models/TodoItem');

import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';

import { MongoDB } from './database/mongo';

import { handleError } from './middlewares/errorHandler/ErrorHandlerMiddleware';

import authRoutes from './routes/authRoutes';
import statusRoutes from './routes/statusRoutes';
import todoRoutes from './routes/todoRoutes';
import Config from './config/Config';

const app: Express = express();
const port = Config.getInstance().params.Port;

app.use(json());
app.use(cors());

app.use(authRoutes);
app.use(statusRoutes);
app.use(todoRoutes);

app.use(handleError);

const mongoDB = MongoDB.getInstance();
mongoDB.mongoUri = Config.getInstance().params.MongoDBUrl;

mongoDB.start();

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
