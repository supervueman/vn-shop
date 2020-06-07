const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_product_delete) {
    logger('error', 'product', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'product', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'product', 404, 'remove.js');
    sendRes({ res, status: 404 });
  }

  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    logger('error', 'product', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => {
    logger('error', 'product', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 204 });
};
