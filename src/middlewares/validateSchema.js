export const validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const errors = JSON.parse(error.message).map((err) => ({
        field: err.path.join('.'),
        error: err.message,
      }))
      res.status(422).json({ message: errors });
    }
  }
};
