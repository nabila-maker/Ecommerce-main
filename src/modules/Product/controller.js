class ProductController {
    constructor(productService) {
      this.productService = productService;
    }

    getAll = async ({ res, next }) => {
        try {
          const products = await this.productService.getAll();
          res.status(200).json(products);
        } catch (err) {
          next(err);
        }
      };
        
      // getOne = async ({ res, next }) => {
      //   try {
      //     const products = await this.productService.getOne();
      //     res.status(200).json(products);
      //   } catch (err) {
      //     next(err);
      //   }
      // };

      create = async (req, res, next) => {
        try {
          const product = await this.productService.create({ ...req.body });
            
          console.log(product)
          res.status(201).json(product);
        
        } catch (err) {
          next(err);
        }
      };
    

      update = async (req, res, next) => {
        try {
          const products = await this.productService.update({ ...req.body });
            
          res.status(201).json(products);
        } catch (err) {
          next(err);
        }
      };
    
      delete = async (req, res, next) => {
        try {
          const { id } = req.body;
          const productFound = await this.productService.findOne({
            where: { id },
          });
    
          await productFound.delete();
    
          res.status(201).json(productFound);
        } catch (err) {
          next(err);
        }

      };

    
};



export default ProductController;
