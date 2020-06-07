const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_order_status_read) {
    logger('error', 'orderstatus', 403, 'count.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const count = await Model.count(filter).catch((err) => {
    logger('error', 'orderstatus', 400, 'count.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: { count } });
};
