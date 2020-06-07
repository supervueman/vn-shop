const Model = require('../model');
const Product = require('../../product/model');
const Field = require('../../../../../core/modules/field/model');
const FieldCategory = require('../../../../../core/modules/fieldcategory/model');

module.exports = () => {
  Model.belongsTo(Field, {
    onDelete: 'cascade'
  });
  Model.belongsTo(Product, {
    onDelete: 'cascade'
  });
  Model.belongsTo(FieldCategory, {
    as: 'category'
  });
};
