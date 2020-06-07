const Model = require('../model');

module.exports = async (req, res) => {
  if (
    !req.rules.is_productmodificator_create &&
    !req.context &&
    req.context.slug !== 'root'
  ) {
    logger('error', 'productmodificator', 403, 'create.js');
    sendRes({ res, status: 403 });
  }

  const operator = req.body.operator;

  if (operator === 'minus' || operator === 'plus') {
    const createdItem = await Model.create(req.body).catch((err) => {
      logger('error', 'productmodificator', 400, 'create.js', err);
      sendRes({ res, status: 400 });
    });

    sendRes({ res, status: 200, data: createdItem });
  } else {
    logger('error', 'productmodificator', 400, 'create.js');
    sendRes({ res, status: 400 });
  }
};
