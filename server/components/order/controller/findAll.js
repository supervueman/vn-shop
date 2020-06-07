const Model = require('../model');

module.exports = async (req, res) => {
  const filter = JSON.parse(req.query.filter || '{}');

  if (!filter.where) {
    filter.where = {};
  }

  if (req.context.slug !== 'root' && req.rules.is_order_read) {
    filter.where.contextId = req.context.id;
  }
  if (req.context !== 'root' && !req.rules.is_order_read) {
    filter.where.ownerId = req.id;
  }

  const items = await Model.findAll(filter).catch((err) => {
    logger('error', 'order', 400, 'findAll.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: items });
};
