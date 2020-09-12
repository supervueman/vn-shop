const ResourceType = require('../../../core/modules/resourcetype/model');

// Data
const courierRules = require('../data/rules_courier.json');
const enLexicons = require('../data/en.json');
const ruLexicons = require('../data/ru.json');
const plLexicons = require('../data/pl.json');

// Healpers
const createLexicons = require('../../../core/modules/lexicon/helpers/createLexicons');
const addNewRules = require('../../../core/modules/role/handlers/addNewRules');

// Init components
const productInit = require('../components/product/init');
const orderstatusInit = require('../components/orderstatus/init');
const deliveryInit = require('../components/delivery/init');
const orderInit = require('../components/order/init');
const ordermodificatorInit = require('../components/ordermodificator/init');
const productmodificatorInit = require('../components/productmodificator/init');

module.exports = async () => {
  await addNewRules('courier', courierRules);

  const productType = await ResourceType.findOne({
    where: {
      slug: 'product'
    }
  });

  if (!productType) {
    await ResourceType.create({
      slug: 'product',
      title: 'Product'
    });
  }

  await createLexicons('ru', ruLexicons);
  await createLexicons('en', enLexicons);
  await createLexicons('pl', plLexicons);

  await productInit();
  await orderstatusInit();
  await deliveryInit();
  await orderInit();
  await ordermodificatorInit();
  await productmodificatorInit();
};
