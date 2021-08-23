const service = require("./products.service");

/**************************** Middleware Functions ****************************/
async function productExists(req, res, next) {
  const product = await service.read(req.params.productId);
  if (!product)
    return next({ status: 404, message: `Product cannot be found.` });

  res.locals.product = product;
  return next();
}

/**************************** CRUDL Operations ****************************/
function read(req, res, next) {
  // Aliasing product as data
  const { product: data } = res.locals;
  res.json({ data });
}

function list(req, res, next) {
  service
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  read: [productExists, read],
  list: [list],
};
