import {Router} from 'express';
import {jwtService, mailerService} from '../../libs';

import ProductDao from './dao';
import ProductRepository from './repository';
import ProductService from './service';
import ProductController from './controller';
import ProductRouter from './router';

const router = Router();

const productRepository = new ProductRepository(ProductDao);
const productService = new ProductService(productRepository, mailerService);
const productController = new ProductController(productService, jwtService);
const productRouter = new ProductRouter(router, productController);

export {productRouter, ProductDao};