import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  // console.log(token)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // console.log(err)
    if (err) return res.sendStatus(403);
    try {
      const { id, email } = decoded.user;
      // console.log(decoded.user);
      //   const { id, email, roles } = decoded;
      req.user = { id, email };
      //   req.user = { id, email, roles };
      next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(403);
    }
  });
};

export { authenticate };
