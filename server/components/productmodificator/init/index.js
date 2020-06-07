const addNewRules = require('../../../../../core/modules/role/handlers/addNewRules');

// New rules
const newRulesAdmin = require('../data/rules_admin.json');
const newRulesDefault = require('../data/rules_default.json');

module.exports = async () => {
  await addNewRules('default', newRulesDefault);
  await addNewRules('admin', newRulesAdmin);
};
