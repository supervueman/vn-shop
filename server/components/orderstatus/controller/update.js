const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.adminAccess) {
    logger('error', 'orderstatus', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'orderstatus', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'orderstatus', 404, 'update.js');
    sendRes({ res, status: 404 });
  }

  const updateItem = req.body;
  delete updateItem.id;

  const updatedItem = await item.update(updateItem, filter).catch((err) => {
    logger('error', 'orderstatus', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: updatedItem });
};
