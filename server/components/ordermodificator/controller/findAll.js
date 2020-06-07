const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_ordermodificator_read) {
    logger('error', 'ordermodificator', 403, 'findAll.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const items = await Model.findAll(filter).catch((err) => {
    logger('error', 'ordermodificator', 400, 'findAll.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: items });
};
