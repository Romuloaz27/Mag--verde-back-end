export const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
    return;
  }
  res.status(403).json({ message: "Admins only" });
}