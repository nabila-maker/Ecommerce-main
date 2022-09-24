import request from 'supertest';

import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import winston from 'winston';
import db from '../../../../config/database';
import App from '../../../../config/server';
import routes from '../../..';
import { csrf } from '../../../../middlewares';
import Logger from '../../../../helpers/logger';

const logger = new Logger();
// import middlewares from '../../../../middlewares';
const middlewares = { cookieParser, csrf, morgan };
const server = new App(express, routes, middlewares, logger);

beforeAll(async () => {
  await db.sequelize;
});

afterAll(async () => {
  // await db.close();
});

describe('user/post', () => {
  it('should return a 201 HTTP ', async () => {
    const res = await request(server.app)
      .post('/user')
      .send({
        email: 'mo@GGGG.fr', password: 'waw', name: 'aa', lastname: 'aa', address: 'aa', tel: 'aa',
      })
      .expect(201);
    //expect(res.body.email).toBe('mo@GGGG.fr');
  });
});
