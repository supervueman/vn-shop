const Model = require('../model');
const Product = require('../../product/model');

module.exports = async (req, res, next) => {
  if (!req.rules.is_order_update && !req.context) {
    logger('error', 'order', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  if (req.context.slug !== 'root') {
    req.body.contextId = req.context.id;
  }

  req.body.ownerId = req.id;

  req.body.summ = 0;

  if (req.body.products && req.body.products.length > 0) {
    const item = await Model.findByPk(req.params.id).catch((err) => {
      logger('error', 'order', 400, 'update.js', err);
      sendRes({ res, status: 400 });
    });

    for await (const product of req.body.products) {
      const productItem = await Product.findByPk(product.id).catch((err) => {
        logger('error', 'order', 400, 'update.js', err);
        sendRes({ res, status: 400 });
      });

      let modificators = [];
      if (productItem.modificators) {
        const productItemModificators = JSON.parse(productItem.modificators);

        modificators = productItemModificators.filter(
          (productItemModificator) =>
            product.modificators.find(
              (el) => el === productItemModificator.slug
            )
        );
      }

      await item
        .addProduct(product.id, {
          through: {
            quantity: product.quantity,
            modificators: JSON.stringify(modificators)
          }
        })
        .catch((err) => {
          logger('error', 'order', 400, 'update.js', err);
          sendRes({ res, status: 400 });
        });

      req.body.summ += productItem.price * product.quantity;
    }

    const updatedItem = await item.update(req.body).catch((err) => {
      logger('error', 'order', 400, 'update.js', err);
      sendRes({ res, status: 400 });
    });

    req.order = updatedItem;

    sendRes({ res, status: 200, data: updatedItem });

    next();
  } else {
    logger('error', 'order', 400, 'update.js');
    sendRes({ res, status: 400 });
  }
};
