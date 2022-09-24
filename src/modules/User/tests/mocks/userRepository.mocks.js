import UserDao from '../../dao';

// creer une base de donnée fake
const users = [];

class UserRepositoryMocks {
  async findAll() {
    return this.users;
  }

  async addNew(userEntity) {
    const user = new UserDao();
    user.email = userEntity.email;
    users.push(user);
    return this.users[users.length - 1];
  }

  async findByEmail() {
    return this.users[0];
  }
}
export default UserRepositoryMocks;
