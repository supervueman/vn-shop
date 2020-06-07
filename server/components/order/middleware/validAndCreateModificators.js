const Modificator = require('../../ordermodificator/model');

module.exports = async (req, res) => {
  if (req.body.modificators) {
    const parseModificators = JSON.parse(req.body.modificators);
    const modificatorsSlugs = parseModificators.map(
      (modificator) => modificator.slug
    );

    const existsModificatorsLayer = await Modificator.findAll({
      where: {
        slug: modificatorsSlugs
      }
    }).catch((err) => {
      logger(
        'error',
        'shop/order/middleware',
        400,
        'valifAndCreateModificators.js',
        err
      );
      sendRes({ res, status: 400 });
    });

    const modificators = [];

    existsModificatorsLayer.forEach((existModificator) => {
      const modificator = parseModificators.find(
        (el) => el.slug === existModificator.slug
      );

      if (modificator) {
        modificators.push({
          slug: existModificator.slug,
          title: existModificator.title,
          target: existModificator.target,
          operator: existModificator.operator,
          value: modificator.value
        });
      }
    });

    req.order.update({
      modificators: JSON.stringify(modificators)
    });
  }
};
