const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.adminAccess) {
    logger('error', 'orderstatus', 403, 'count.js');
    sendRes({ res, status: 403 });
  }

  if (req.context.slug !== 'root') {
    req.body.contextId = req.context.id;
  }

  const createdItem = await Model.create(req.body).catch((err) => {
    logger('error', 'orderstatus', 400, 'count.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: createdItem });
};
