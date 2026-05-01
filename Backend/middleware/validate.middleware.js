const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  try {
    if (schema.params) req.params = schema.params.parse(req.params);
    if (schema.query) req.query = schema.query.parse(req.query);
    if (schema.body) req.body = schema.body.parse(req.body);
    next();
  } catch (err) {
    const errorMessages = err.errors?.map((e) => e.message).join(', ');
    return next(new ApiError(400, `Validation Error: ${errorMessages}`, err.errors));
  }
};

module.exports = validate;
