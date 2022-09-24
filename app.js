import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import winston from 'winston';
import Server from './src/config/server';
import db from './src/config/database';
import config from './src/config/env';
import { csrf } from './src/middlewares';
import Logger from './src/helpers/logger';
import routes from './src/modules';
import cors from "cors"

const logger = new Logger();
const corsSetup = cors(
  {
    credentials: true,
    origin:"http://localhost:3000"
  }

);

const middlewares = { cookieParser, csrf, morgan, corsSetup};
const application = new Server(express, routes, middlewares, logger);

(async () => {
  try {
    await db.associateAll(db.sequelize.models);
    await db.sequelize.sync({ alter: true, force: false });
    await application.listen(config.app_port);
  } catch (e) {
    console.error(e);
    logger.log('warn', e.message);
  }
})();
