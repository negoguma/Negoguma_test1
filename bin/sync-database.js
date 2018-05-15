const models = require('../databases');

module.exports = () => {
  return models.sequelize.sync({force: false});
};