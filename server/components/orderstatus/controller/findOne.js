const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_order_status_read) {
    logger('error', 'orderstatus', 403, 'findOne.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findOne(filter).catch((err) => {
    logger('error', 'orderstatus', 400, 'findOne.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'orderstatus', 404, 'findOne.js');
    sendRes({ res, status: 404 });
  }

  sendRes({ res, status: 200, data: item });
};
