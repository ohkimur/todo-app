'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.invalidRoute = exports.validate = void 0
const validate = schema => async (req, res, next) => {
  try {
    const parsedSchema = await schema.safeParseAsync(req.body)
    if (!parsedSchema.success) {
      return res
        .status(400)
        .json(Object.assign({}, parsedSchema.error.format()))
    }
    return next()
  } catch (error) {
    return res.status(400).json(error)
  }
}
exports.validate = validate
const invalidRoute = (_req, res) => {
  res.status(404).json({ message: 'Invalid route' })
}
exports.invalidRoute = invalidRoute
