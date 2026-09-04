const app = require("./src/app");
const db = require("./src/config/db");
const { PORT } = require("./src/config/config");

db((cb) => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
