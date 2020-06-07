const Model = require('../model');
const Product = require('../../product/model');

module.exports = async (req, res, next) => {
  if (!req.rules.is_order_create && !req.context) {
    logger('error', 'order', 403, 'create.js');
    sendRes({ res, status: 403 });
  }

  if (req.context.slug !== 'root') {
    req.body.contextId = req.context.id;
  }

  if (req.body.products && req.body.products.length > 0) {
    req.body.ownerId = req.id;
    req.body.summ = 0;

    const createdItem = await Model.create(req.body).catch((err) => {
      logger('error', 'order', 400, 'create.js', err);
      sendRes({ res, status: 400 });
    });

    const order_num = `VN-${String(Date.now()).substr(0, 4)}/${createdItem.id}`;

    for await (const product of req.body.products) {
      const productItem = await Product.findByPk(product.id).catch((err) => {
        logger('error', 'order', 400, 'create.js', err);
        sendRes({ res, status: 400 });
      });

      if (productItem) {
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

        await createdItem
          .addProduct(product.id, {
            through: {
              quantity: product.quantity,
              modificators: JSON.stringify(modificators)
            }
          })
          .catch((err) => {
            logger('error', 'order', 400, 'create.js', err);
            sendRes({ res, status: 400 });
          });
      }

      req.body.summ += productItem.price * product.quantity;
    }

    const updatedItem = await createdItem
      .update({
        order_num,
        summ: req.body.summ
      })
      .catch((err) => {
        logger('error', 'order', 400, 'create.js', err);
        sendRes({ res, status: 400 });
      });

    req.order = updatedItem;

    sendRes({ res, status: 200, data: updatedItem });

    next();
  } else {
    logger('error', 'order', 400, 'create.js');
    sendRes({ res, status: 400 });
  }
};
