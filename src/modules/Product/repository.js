class ProductRepository {
    constructor(productDao) {
      this.productDAO = productDao;
    }
  
    async findAll() {
      return await this.productDAO.findAll();
    }
  
    async create(productEntity) {
      return await this.productDAO.create(productEntity);
     
    }
  
    async findById(productEntity) {
      return await this.productDAO.findOne({ where: { id: productEntity.id } });
    }
  
    async update(productEntity) {
      return await this.productDAO.update(productEntity);
    }
  
    async delete(productEntity) {
      return await this.productDAO.delete(productEntity);
    }
  }
  
  export default ProductRepository;
  