const service = require("./products.service");
const errBound = require("../errors/asyncErrorBoundary");

/**************************** Middleware Functions ****************************/
async function productExists(req, res, next) {
  const product = await service.read(req.params.productId);
  if (!product)
    return next({ status: 404, message: `Product cannot be found.` });

  res.locals.product = product;
  return next();
}

/**************************** CRUDL Operation Handlers ****************************/
function read(req, res, next) {
  // Aliasing product as data
  const { product: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

/**************************** Aggregate Data Handlers ****************************/
async function listOutOfStockCount(req, res, next) {
  res.json({ data: await service.listOutOfStockCount() });
}

async function listPriceSummary(req, res, next) {
  res.json({ data: await service.listPriceSummary() });
}

async function listTotalWeightByProduct(req, res) {
  res.json({ data: await service.listTotalWeightByProduct() });
}

module.exports = {
  read: [errBound(productExists), read],
  list: [errBound(list)],
  listOutOfStockCount: [errBound(listOutOfStockCount)],
  listPriceSummary: [errBound(listPriceSummary)],
  listTotalWeightByProduct: [errBound(listTotalWeightByProduct)],
};
