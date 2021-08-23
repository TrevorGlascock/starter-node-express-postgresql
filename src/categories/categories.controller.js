const service = require("./categories.service");
const errBound = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list: errBound(list),
};
