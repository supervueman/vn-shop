const Model = require('../model');

module.exports = async (req, res, next) => {
  if (
    !req.rules.is_productmodificator_update &&
    !req.context &&
    req.context.slug !== 'root'
  ) {
    logger('error', 'productmodificator', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  const operator = req.body.operator;

  if (operator === 'minus' || operator === 'plus') {
    const item = await Model.findByPk(req.params.id).catch((err) => {
      logger('error', 'productmodificator', 400, 'update.js', err);
      sendRes({ res, status: 400 });
    });

    if (!item) {
      logger('error', 'productmodificator', 404, 'update.js');
      sendRes({ res, status: 404 });
    }

    delete req.body.id;

    const updatedItem = await item.update(req.body).catch((err) => {
      logger('error', 'productmodificator', 400, 'update.js', err);
      sendRes({ res, status: 400 });
    });

    res.status(200).send(updatedItem);
  } else {
    logger('error', 'productmodificator', 400, 'update.js');
    sendRes({ res, status: 400 });
  }
};
