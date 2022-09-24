class AuthMiddleware {

    constructor(jwtService) {
        this.jwt = jwtService;
    }

    authenticate = async (req, res, next) => {
        try {
            // const authHeader = req.headers['authorization'];
            // const token = authHeader && authHeader.split(' ')[1];
            const token = req.headers.authorization.split(" ")[1];
          
            const cookie = req.cookies['auth-cookie'];


            // if (token == null) return res.sendStatus(401);

            if (!cookie) {
                return res.status(401).json('Access denied. Your session expired');
            }

            // Verify Token
            const decoded = await this.jwt.decodeToken(token);           

            // if the user has permissions
            
            req.currentUserId = decoded.id;
            next();

        } catch (e) {
            return res.status(401).json('Authentication failed : \n' + e);

        }
    }

   




}

export default AuthMiddleware;