const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_product_create) {
    logger('error', 'product', 403, 'addTranslation.js');
    sendRes({ res, status: 403 });
  }

  for await (let arr of req.body) {
    const item = await Model.findByPk(arr[0]).catch((err) => {
      logger('error', 'product', 400, 'addTranslation.js', err);
      sendRes({ res, status: 400 });
    });

    if (!item) {
      logger('error', 'product', 404, 'addTranslation.js');
      sendRes({ res, status: 404 });
    }

    await item.addTranslation(arr[1]).catch((err) => {
      logger('error', 'product', 400, 'addTranslation.js', err);
      sendRes({ res, status: 400 });
    });
  }

  sendRes({ res, status: 200 });
};
