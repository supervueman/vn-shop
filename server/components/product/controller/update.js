const Model = require('../model');
const SystemSetting = require('../../../../../core/modules/systemsetting/model');

module.exports = async (req, res) => {
  if (!req.rules.is_product_update) {
    logger('error', 'product', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  const item = await Model.findByPk(req.params.id, filter).catch((err) => {
    logger('error', 'product', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'product', 404, 'update.js');
    sendRes({ res, status: 404 });
  }

  if (req.context.slug !== 'root' && item.contextId !== req.context.id) {
    logger('error', 'product', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  const is_id_in_slug = await SystemSetting.findOne({
    where: {
      slug: 'is_id_in_slug'
    }
  }).catch((err) => {
    logger('error', 'product', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  const updateItem = req.body;

  if (JSON.parse(is_id_in_slug.setting).value) {
    const slugId = updateItem.slug.substring(
      updateItem.slug.length - `${updateItem.id}`.length
    );

    if (`-${slugId}` !== `-${updateItem.id}`) {
      updateItem.slug = `${req.body.slug}-${updateItem.id}`;
    }
  }

  const updatedItem = await item.update(updateItem).catch((err) => {
    logger('error', 'product', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: updatedItem });
};
