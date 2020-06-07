const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.isAuth) {
    logger('error', 'productfield', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'productfield', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'productfield', 404, 'update.js');
    sendRes({ res, status: 404 });
  }

  const updateItem = req.body;
  delete updateItem.id;

  const updatedItem = await item.update(updateItem).catch((err) => {
    logger('error', 'productfield', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: updatedItem });
};