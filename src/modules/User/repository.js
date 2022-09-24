/* eslint-disable no-return-await */
import bcrypt from 'bcrypt';
import { ProductDao } from '../Product';
import { ReservationDao } from '../Reservation';

class UserRepository {
  constructor(userDao) {
    this.userDAO = userDao;
  }

  async findAll() {
    return await this.userDAO.findAll();
  }

  async create(userEntity) {
    const salt = bcrypt.genSaltSync(10);
    userEntity.password = bcrypt.hashSync(userEntity.password, salt);
    return await this.userDAO.create(userEntity);
  }

  async findById(userEntity) {
    return await this.userDAO.findOne({ where: { id: userEntity.id }, include:{as: "reservations",model:ReservationDao, include:{as:"products",model:ProductDao,attributes:{exclude:[productId,createdAt,UpdatedAt]}}}});
  }

  async findByMail(userEntity) {
    return await this.userDAO.findOne({ where: { email: userEntity.email } });
  }

  async update(userEntity) {
    return await this.userDAO.update(userEntity);
  }

  async delete(userEntity) {
    return await this.userDAO.delete(userEntity);
  }
  compareHash = async (password, hash) => await bcrypt.compareSync(password, hash);
}

export default UserRepository;
