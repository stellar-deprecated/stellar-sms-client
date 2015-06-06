require("babel/register");
var Stex = require('stex');

module.exports = Stex.new(__dirname + "/..", function(stex) {
  var router = stex.router;
  var controllers = stex.controllers;

  app.use(controllers.middlewares.rawBody);

  router.post('/receive', controllers.receive);
});
