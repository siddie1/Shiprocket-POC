exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};
