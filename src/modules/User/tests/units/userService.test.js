import UserDao from '../../dao';
import UserService from '../../service';
import UserRepositoryMocks from '../mocks/userRepository.mocks';
import mailerService from '../../../../libs';

const userService = new UserService(
  new UserRepositoryMocks(),
  mailerService,
);

const datatest = {
  email: 'machin@gmail.com',
  password: 'test',
};

describe('user use case', () => {
  describe('add user:use case', () => {
    it('should show a new user', async () => {
      const result = await userService.register(datatest);
      expect(e.statusCode).toBe(201);
    });
  });
})

  it('Should throw a error if userdata is empty or null', async () => {
    try {
      await userService.register({ email: '', password: '' });
    } catch (e) {
      expect(e.statusCode).toBe(400);
      expect(e.message).toBe('Missing required email and password fields');
    }
  });

//   describe('find a user:use case', () => {
//     it('should find a user', async () => {
//       const users = await userService.getAll();
//       expect(users[0].email).toBe('machin@gmail.com');
//     });
//   });
// });
