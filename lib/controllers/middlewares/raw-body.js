var getRawBody = require('raw-body');

module.exports = (req, res, next) => {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '1mb'
  }, function (err, buffer) {
    if (err) return next(err);
    req.rawBody = buffer.toString();
    next();
  })
};
