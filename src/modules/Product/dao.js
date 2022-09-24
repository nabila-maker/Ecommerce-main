
import pkg from 'sequelize';
import db from '../../config/database';

const { Model, DataTypes } = pkg;

class ProductDao extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4 
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.STRING,
      images: DataTypes.STRING,

    }, { sequelize, modelName: 'Product'});
  }

  static associate(models) {
    // define association here
    // this.belongsTo(models.Service);
    this.hasMany(models.Reservation,{foreignKey:"productId"} );
    return this;
  }
}

ProductDao.init(db.sequelize);

export default ProductDao;
