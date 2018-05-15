const app = require('../app');
const syncDatabase = require('./sync-database');
const port = 3000;


app.listen(port, () => {
  console.log('Example app listening on port 3000');

  syncDatabase().then(() => {
    console.log('Database sync');
  })
})