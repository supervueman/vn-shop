const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_order_delete) {
    logger('error', 'order', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.params.id, {
    include: ['products']
  }).catch((err) => {
    logger('error', 'order', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'order', 404, 'remove.js');
    sendRes({ res, status: 404 });
  }

  for await (const product of item.products) {
    await item.removeProduct(product.id).catch((err) => {
      logger('error', 'order', 400, 'remove.js', err);
      sendRes({ res, status: 400 });
    });
  }

  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    logger('error', 'order', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => {
    logger('error', 'order', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 204 });
};
