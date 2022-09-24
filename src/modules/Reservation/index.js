import {Router} from 'express';
import {jwtService, mailerService} from '../../libs';
import {auth} from '../../middlewares';

import ReservationDao from './dao';
import ReservationRepository from './repository';
import ReservationService from './service';
import ReservationController from './controller';
import ReservationRouter from './router';

const router = Router();

const reservationRepository = new ReservationRepository(ReservationDao);
const reservationService = new ReservationService(reservationRepository, mailerService);
const reservationController = new ReservationController(reservationService, jwtService);
const reservationRouter = new ReservationRouter(router,auth, reservationController);

export {reservationRouter, ReservationDao};