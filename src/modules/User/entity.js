class UserEntity {
  constructor({
    id, name, email, password, 
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  
  }

  validate() {
    if (!this.email || !this.password || !this.name ) return false;
    return true;
  }

  validateLogin() {
    if 
      (!this.email || !this.password) return false;
     
       return true
   
  }
}

export default UserEntity;
