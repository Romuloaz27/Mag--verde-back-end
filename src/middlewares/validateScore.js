export const validateScore = (req, res, next) => {
  const { score } = req.body;
  if (score < 1 || score > 5) {
    res.status(400).json({ message: 'A nota deve ser entre 1 e 5.' })
    return;
  }
  next();
}