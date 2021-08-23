const service = require("./categories.service");

function list(req, res, next) {
  service
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  list,
};
