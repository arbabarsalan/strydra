/**
 * logger.js
 * Logs every incoming request with method, URL, and timestamp.
 * Attach to app with: app.use(logger)
 */
function logger(req, res, next) {
  const ts     = new Date().toISOString();
  const method = req.method.padEnd(6);
  console.log(`[${ts}]  ${method} ${req.url}`);
  next();
}

module.exports = logger;
