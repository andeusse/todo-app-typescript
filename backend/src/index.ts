require('./models/User');
require('./models/TodoItem');

import express, { Express } from 'express';
import dotenv, { DotenvConfigOptions } from 'dotenv';
import cors from 'cors';
import { json } from 'body-parser';

import { MongoDB } from './database/mongo';

import { handleError } from './middlewares/errorHandler/ErrorHandlerMiddleware';

import authRoutes from './routes/authRoutes';
import statusRoutes from './routes/statusRoutes';
import todoRoutes from './routes/todoRoutes';

const dotenvOptions: DotenvConfigOptions = {
	path: `${__dirname}/../.env`,
};

dotenv.config(dotenvOptions);

const app: Express = express();
const port =
	process.env.STATUS === 'dev' ? process.env.DEV_PORT : process.env.PROD_PORT;

app.use(json());
app.use(cors());

app.use(authRoutes);
app.use(statusRoutes);
app.use(todoRoutes);

app.use(handleError);

const mongoDB = MongoDB.getInstance();
mongoDB.mongoUri =
	process.env.STATUS === 'dev' ? process.env.DEV_DB! : process.env.PROD_DB!;
mongoDB.start();

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
