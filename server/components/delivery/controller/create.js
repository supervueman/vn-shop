const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_delivery_create && !req.context) {
    logger('error', 'delivery', 403, 'create.js');
    sendRes({ res, status: 403 });
  }

  if (req.context.slug !== 'root') {
    req.body.contextId = req.context.id;
  }

  const createdItem = await Model.create(req.body).catch((err) => {
    logger('error', 'delivery', 400, 'create.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: createdItem });
};
