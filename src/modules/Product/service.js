import ProductEntity from './entity';
import { ApiError } from '../../helpers/error';

class ProductService {
  constructor(productRepository) {
    this.productRepo = productRepository;
   
  }

  async getAll() {
    const product = await this.productRepo.findAll();
    return product.map((product) => new ProductEntity(product));
  }

  async create(productData) {
    const productEntity = new ProductEntity(productData);
    const newProduct = await this.productRepo.create(productEntity);
    return newProduct;
  }

  // async getOne(productData) {
  //   const productEntity = new ProductEntity(productData);
  //   const product = await this.productRepo.findById(productEntity);
  //   return product;
  // }

  async update(productData) {
    const productEntity = new ProductEntity(productData);
    const productFound = await this.productRepo.findById(productEntity);
    const product = productFound.update(productEntity);
    return product;
  }

  async delete(productData) {
    const productEntity = new ProductEntity(productData);
    const productFound = await this.productRepo.findOne(productEntity);
    const product = productFound.delete(productFound);
    return product;
  }
}

export default ProductService;
