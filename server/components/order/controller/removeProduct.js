const Model = require('../model');
const Product = require('../../product/model');

module.exports = async (req, res) => {
  if (!req.rules.is_order_update) {
    logger('error', 'order', 403, 'removeProduct.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.body.id, {
    include: ['products']
  }).catch((err) => {
    logger('error', 'order', 400, 'removeProduct.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'order', 404, 'removeProduct.js');
    sendRes({ res, status: 404 });
  }

  const product = await Product.findByPk(req.body.productId).catch((err) => {
    logger('error', 'order', 400, 'removeProduct.js', err);
    sendRes({ res, status: 400 });
  });

  if (!product) {
    logger('error', 'order', 404, 'removeProduct.js');
    sendRes({ res, status: 404 });
  }

  item.products.forEach((el) => {
    if (el.id === req.body.productId) {
      req.body.quantity = el.OrderProduct.quantity;
    }
  });

  const itemSumm = item.summ - product.price * req.body.quantity;

  await item.removeProduct(req.body.productId).catch((err) => {
    logger('error', 'order', 400, 'removeProduct.js', err);
    sendRes({ res, status: 400 });
  });

  const updatedItem = await item
    .update({
      summ: itemSumm
    })
    .catch((err) => {
      logger('error', 'order', 400, 'removeProduct.js', err);
      sendRes({ res, status: 400 });
    });

  sendRes({ res, status: 200, data: updatedItem });
};
