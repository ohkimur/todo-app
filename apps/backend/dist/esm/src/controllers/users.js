export const getCurrentUser = async (req, res, _next) => {
  res.json(req.user)
}
