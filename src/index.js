require('./utils/db');
const app = require('./app');
const PORT = 3000;

const server = app.listen(process.env.PORT || PORT, () => {
  console.log(` :) App started on http://localhost:${PORT}`);
});
