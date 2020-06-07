const Model = require('../model');

module.exports = async (req, res, next) => {
  if (
    !req.rules.is_ordermodificator_update &&
    !req.context &&
    req.context.slug !== 'root'
  ) {
    logger('error', 'ordermodificator', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'ordermodificator', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'ordermodificator', 404, 'remove.js');
    sendRes({ res, status: 404 });
  }

  delete req.body.id;

  const updatedItem = await item.update(req.body).catch((err) => {
    logger('error', 'ordermodificator', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: updatedItem });
};
