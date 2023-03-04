'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getCurrentUser = void 0
const getCurrentUser = async (req, res, _next) => {
  res.json(req.user)
}
exports.getCurrentUser = getCurrentUser
