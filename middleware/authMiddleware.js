/* auth-middleware.js */
const validUser = {
  username: 'link77',
  password: '1234'
};

const authMiddleware = (req, res, next) => {
  const { username, password } = req.headers;
  if (!username || !password) {
    return res.status(401).json({ message: 'Nome ou senha inxistentes!' });
  }
    if(username !== validUser.username ||  password !== validUser.password) {
    return res.status(401).json({ message: 'Nome ou senha não autorizados!' });
  }
next();  
};

module.exports = authMiddleware;