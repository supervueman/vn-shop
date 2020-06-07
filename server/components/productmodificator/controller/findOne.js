const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_productmodificator_read) {
    logger('error', 'productmodificator', 403, 'findOne.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findOne(filter).catch((err) => {
    logger('error', 'productmodificator', 400, 'findOne.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'productmodificator', 404, 'findOne.js');
    sendRes({ res, status: 404 });
  }

  sendRes({ res, status: 200, data: item });
};
