class JwtService {
  constructor(jwt, secret) {
    this.jwt = jwt;
    this.secret = secret;
  }

  decodeToken(token) {
    return this.jwt.verify(token, this.secret);
    
  }

  async generateRefreshToken(user) {
    return await this.jwt.sign({...user}, this.secret, { expiresIn: "1y" });
  }

  async generateToken(data) {
    return await this.jwt.sign({...data}, this.secret, { expiresIn: 1800 });
  }

}

export default JwtService;
