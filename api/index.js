const serverless = require("serverless-http");

// Import the built Express app
const { app, setupApp } = require("../dist/index.cjs");

let handler = null;

module.exports = async (req, res) => {
  if (!handler) {
    await setupApp();
    handler = serverless(app);
  }
  return handler(req, res);
};
