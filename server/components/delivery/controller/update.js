const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_delivery_update) {
    logger('error', 'delivery', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'delivery', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'delivery', 404, 'update.js');
    sendRes({ res, status: 404 });
  }

  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    logger('error', 'delivery', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  delete req.body.id;

  const updatedItem = await item.update(req.body, filter).catch((err) => {
    logger('error', 'delivery', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: updatedItem });
};
