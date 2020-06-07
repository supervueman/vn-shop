const addNewRules = require('../../../../../core/modules/role/handlers/addNewRules');

// New rules
const newRulesAdmin = require('../data/rules_admin.json');
const newRulesDefault = require('../data/rules_default.json');
const newRulesManager = require('../data/rules_manager.json');

module.exports = async () => {
  await addNewRules('default', newRulesDefault);
  await addNewRules('admin', newRulesAdmin);
  await addNewRules('manager', newRulesManager);
};
