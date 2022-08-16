const { User, schemas } = require('../../models/user')

const { createError } = require('../../helpers')

const updateSubscription = async (req, res) => {
  const { error } = schemas.subscription.validate(req.body)
  if (error) {
    throw createError(400, error.message)
  }
  const { _id } = req.user
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true })
  if (!result) {
    throw createError(404)
  }
  res.json(result)
}

module.exports = updateSubscription
