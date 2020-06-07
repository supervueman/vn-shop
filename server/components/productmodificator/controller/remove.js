const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_productmodificator_delete && req.context.slug !== 'root') {
    logger('error', 'productmodificator', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findByPk(req.params.id).catch((err) => {
    logger('error', 'productmodificator', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'productmodificator', 404, 'remove.js');
    sendRes({ res, status: 404 });
  }

  await Model.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => {
    logger('error', 'productmodificator', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 204 });
};
