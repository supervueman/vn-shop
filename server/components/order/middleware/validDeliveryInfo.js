const Delivery = require('../../delivery/model');

function validDeliveryInfo(deliveryInfo, deliverySchema, err) {
  const validDeliveryInfo = {};

  for (const key in deliverySchema) {
    if (deliverySchema[key].required && !deliveryInfo[key].value) {
      err({
        message: `[Delivery info]: Field '${key}' must be required.`,
        field: key
      });
      return;
    }

    validDeliveryInfo[key] = {
      type: deliverySchema[key].type,
      title: deliverySchema[key].title,
      required: deliverySchema[key].required,
      value: deliveryInfo[key].value
    };
  }

  return JSON.stringify(validDeliveryInfo);
}

module.exports = async (req, res, next) => {
  if (
    (!req.rules.is_order_create && !req.context) ||
    (!req.rules.is_order_update && !req.context)
  ) {
    logger('error', 'shop-order-middleware', 403, 'validDeliveryInfo.js');
    sendRes({ res, status: 403 });
  }

  const delivery = await Delivery.findByPk(req.body.deliveryId).catch((err) => {
    logger('error', 'shop-order-middleware', 400, 'validDeliveryInfo.js', err);
    sendRes({ res, status: 400 });
  });

  if (delivery && delivery.schema) {
    if (!req.body.delivery_info) {
      logger('error', 'shop-order-middleware', 400, 'validDeliveryInfo.js');
      sendRes({ res, status: 400, message: '[Delivery info]: Not exist' });
    }

    const deliveryInfo = JSON.parse(req.body.delivery_info);
    const deliverySchema = JSON.parse(delivery.schema);

    req.body.delivery_info = validDeliveryInfo(
      deliveryInfo,
      deliverySchema,
      (err) => {
        logger(
          'error',
          'shop-order-middleware',
          400,
          'validDeliveryInfo.js',
          err
        );
        sendRes({ res, status: 400, message: err.message });
      }
    );

    next();
  } else if (!delivery && req.body.delivery_info) {
    logger('error', 'shop-order-middleware', 400, 'validDeliveryInfo.js');
    sendRes({ res, status: 400 });
  } else {
    next();
  }
};
