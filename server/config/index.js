module.exports = {
  routes: [
    {
      base_route_name: 'products',
      route_dir_path: 'shop/components/product/routes'
    },
    {
      base_route_name: 'productfields',
      route_dir_path: 'shop/components/productfield/routes'
    },
    {
      base_route_name: 'orderstatuses',
      route_dir_path: 'shop/components/orderstatus/routes'
    },
    {
      base_route_name: 'deliveries',
      route_dir_path: 'shop/components/delivery/routes'
    },
    {
      base_route_name: 'orders',
      route_dir_path: 'shop/components/order/routes'
    },
    {
      base_route_name: 'ordermodificators',
      route_dir_path: 'shop/components/ordermodificator/routes'
    },
    {
      base_route_name: 'productmodificators',
      route_dir_path: 'shop/components/productmodificator/routes'
    }
  ],

  associations: [
    {
      association_dir_path: 'shop/components/product/association'
    },
    {
      association_dir_path: 'shop/components/productfield/association'
    },
    {
      association_dir_path: 'shop/components/orderstatus/association'
    },
    {
      association_dir_path: 'shop/components/delivery/association'
    },
    {
      association_dir_path: 'shop/components/order/association'
    }
  ],
  swaggerPaths: [
    'components/delivery/model/index.js',
    'components/delivery/routes/index.js',
    'components/order/model/index.js',
    'components/order/routes/index.js',
    'components/orderstatus/model/index.js',
    'components/orderstatus/routes/index.js',
    'components/product/model/index.js',
    'components/product/routes/index.js',
    'components/productfield/model/index.js',
    'components/productfield/routes/index.js',
    'components/ordermodificator-layer/model/index.js',
    'components/ordermodificator-layer/routes/index.js',
    'components/productmodificator/model/index.js',
    'components/productmodificator/routes/index.js'
  ]
};
