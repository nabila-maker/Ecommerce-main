class UserController {
  constructor(userService, jwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  getAllByUser = async (req, res, next) => {
    try {

      const userId = req.currentUserId
      const user = await this.userService.getAllByUser(userId);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  getAll = async ({ req, res, next }) => {
    try {
      const users = await this.userService.getAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  register = async (req, res, next) => {
    try {
      const user = await this.userService.register({ ...req.body });
      res.status(201);
    } catch (err) {
      next(err);
    }
  };

  getOne = async (req, res, next) => {
    try {
      const service = await this.userService.getOne({ ...req.body });

      res.status(201).json(service);
    } catch (err) {
      next(err);
    }
  };

  getOneByMail = async (req, res, next) => {
    try {
      const service = await this.userService.getOneByMail({ ...req.body });

      res.status(201).json(service);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      console.log(req.body)
      const service = await this.userService.update({ ...req.body });

      res.status(201).json(service);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.body;
      const serviceFound = await this.userService.findOne({
        where: { id },
      });

      await serviceFound.delete();

      res.status(201).json(serviceFound);
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const user = await this.userService.login({ ...req.body });
      const token = await this.jwtService.generateToken({ id: user.id });
      const refreshToken = await this.jwtService.generateRefreshToken({ id: user.id });
       res.cookie('auth-cookie', token, { expires: false });
      res.status(200).json({ user, token, refreshToken,expireDate:Date.now() + 180000 });
    } catch (err) {
      next(err);
    }
  };

  // app.post('/api/refreshToken', (req, res) => {
  refreshToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);
    try {
      const decoded = await this.jwtService.decodeToken(token);
    } catch (e) {

    }

    const refreshedToken =this.jwtService.generateAccessToken(decoded);
    res.send({
      accessToken: refreshedToken,
    });
  };
}

export default UserController;
