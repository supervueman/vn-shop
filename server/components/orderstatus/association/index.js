const Model = require('../model');
const Context = require('../../../../../core/modules/context/model');

module.exports = () => {
  Model.belongsTo(Context, {
    onDelete: 'cascade'
  });
};
