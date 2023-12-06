const app = require("./app");
const logger = require("./lib/logger");

const port = process.env.PORT || 8000;

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
