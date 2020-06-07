const Model = require('../model');
const Context = require('../../../../../core/modules/context/model');

const addNewRules = require('../../../../../core/modules/role/handlers/addNewRules');

// New rules
const orderstatusesData = require('../data/orderstatuses.json');
const newRulesAdmin = require('../data/rules_admin.json');
const newRulesDefault = require('../data/rules_default.json');

module.exports = async () => {
  const rootContext = await Context.findOne({
    slug: 'root'
  });

  for await (let item of orderstatusesData) {
    const existItem = await Model.findOne({
      where: {
        title: item.title
      }
    });

    if (!existItem) {
      await Model.create({
        ...item,
        contextId: rootContext.id
      });
    }
  }

  await addNewRules('default', newRulesDefault);
  await addNewRules('admin', newRulesAdmin);
};
