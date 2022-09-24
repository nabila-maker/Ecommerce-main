
import pkg from 'sequelize';
import db from '../../config/database';

const { Model, DataTypes } = pkg;

class ReservationDao extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4 
      },
      date:{
       type:DataTypes.DATE,
       defaultValue:DataTypes.NOW
      },

   status:{    
    type:DataTypes.BOOLEAN,
    defaultValue:false
               
  },

// userId: DataTypes.UUID,
// productId: DataTypes.UUID

    },

   { sequelize, modelName: 'Reservation' });
  }

  static associate(models) {
    this.belongsTo(models.Product,{foreignKey:  "productId", as:"products"} )
    this.belongsTo(models.User,{foreignKey: "userId" }  )
    return this;
  }
}

ReservationDao.init(db.sequelize);

export default ReservationDao;
