const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_delivery_read) {
    logger('error', 'delivery', 403, 'findOne.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findOne(filter).catch((err) => {
    logger('error', 'delivery', 400, 'findOne.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'delivery', 404, 'findOne.js');
    sendRes({ res, status: 404 });
  }

  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    logger('error', 'delivery', 403, 'findOne.js');
    sendRes({ res, status: 403 });
  }

  sendRes({ res, status: 200, data: item });
};
