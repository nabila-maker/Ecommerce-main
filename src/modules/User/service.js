import UserEntity from './entity';
import { ApiError } from '../../helpers/error';

class UserService {
  constructor(userRepository, mailerService) {
    this.userRepo = userRepository;
    this.mailerService = mailerService;
  }

  async getAll() {
    const users = await this.userRepo.findAll();
    return users.map((user) => new UserEntity(user));
  }

  async register(userData) {
    const userEntity = new UserEntity(userData);
    //  try { 
     if (!userEntity.validate()) { throw new ApiError(400, 'Missing required  fields'); }
  
    
      const userFound = await this.userRepo.findByMail(userEntity);
      console.log(userFound)
   
    if (userFound) {throw new ApiError(409, "Ressource existante", "Ce User existe déjà");
   
    }else{
       const newUser = await this.userRepo.create(userEntity);
    return new UserEntity(newUser);  
    }


  
  }

  async getAllByUser(userData) {

    const userEntity = new UserEntity(userData);
    const user = await this.userRepo.findByUser(userEntity);
    // console.log("heyyy",reservation)
    return user;
  }
  

  async getOne(userData) {
    const userEntity = new UserEntity(userData);
    const user = await this.userRepo.findById(userEntity);
    return user;
  }

  async getOneByMail(userData) {
    const userEntity = new UserEntity(userData);
    const user = await this.userRepo.findByMail(userEntity);
    return user;
  }

  async update(userData) {
    const userEntity = new UserEntity(userData);
    const user = await this.userRepo.findById(userEntity);
    const userUpdated = user.update(userEntity);
    return userUpdated;
  }

  async delete(userData) {
    const userEntity = new UserEntity(userData);
    const user = await this.userRepo.findById(userEntity);
    const userDeleted = user.delete(userEntity);
    return userDeleted;
  }

  async login(userData) {
    const userEntity = new UserEntity(userData);
    // console.log(userEntity)
    if (!userEntity.validateLogin()) { throw new ApiError(400, 'Missing required mail and password fields'); }

    const user = await this.userRepo.findByMail(userEntity);
    if (!user) { throw new ApiError(400, 'User with the specified email does not exists'); }

    const passwordMatch = await this.userRepo.compareHash(userEntity.password, user.password);
    console.log(passwordMatch)
    if (!passwordMatch) { throw new ApiError(400, 'User password do not match'); }

    return new UserEntity(user);
  }
}

export default UserService;
