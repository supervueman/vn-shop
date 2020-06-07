const Model = require('../model');
const ProductField = require('../../productfield/model');
const Layout = require('../../../../../core/modules/layout/model');
const ResourceType = require('../../../../../core/modules/resourcetype/model');
const Context = require('../../../../../core/modules/context/model');
const Tag = require('../../../../../core/modules/tag/model');

module.exports = () => {
  Model.hasMany(ProductField, {
    as: 'productfields',
    onDelete: 'cascade'
  });

  Model.belongsTo(Context, {
    onDelete: 'cascade'
  });

  Context.hasMany(Model, {
    as: 'products',
    onDelete: 'cascade',
    foreignKey: 'contextId'
  });

  Model.belongsTo(Model, {
    onDelete: 'cascade',
    as: 'parent'
  });

  Model.belongsTo(Layout, {
    as: 'layout'
  });

  Model.belongsTo(ResourceType, {
    as: 'resourcetype'
  });

  Model.belongsToMany(Model, {
    as: 'translations',
    onDelete: 'cascade',
    through: 'ProductTranslation',
    constraints: false
  });

  Model.hasMany(Model, {
    as: 'children',
    onDelete: 'cascade',
    foreignKey: 'parentId'
  });

  Model.belongsToMany(Tag, {
    as: 'tags',
    onDelete: 'cascade',
    through: 'ProductTag',
    constraints: false
  });
};
