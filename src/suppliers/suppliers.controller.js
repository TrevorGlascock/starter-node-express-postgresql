const service = require("./suppliers.service.js");
const hasProperties = require("../errors/hasProperties");

/**************************** Middleware Functions ****************************/
const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods",
];

// Ensure the body of the request only possesses properties that are valid
function hasOnlyValidProps(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  return next();
}

// Ensures the body of the request contains all of the required properties
const hasRequiredProps = hasProperties("supplier_name", "supplier_email");

// Ensures the supplierId in the url matches a valid supplier
function supplierExists(req, res, next) {
  service
    .read(req.params.supplierId)
    .then((supplier) => {
      if (!supplier)
        return next({ status: 404, message: `Supplier cannot be found.` });

      res.locals.supplier = supplier;
      return next();
    })
    .catch(next);
}

/**************************** CRUDL Operations ****************************/
async function create(req, res, next) {
  service
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

async function update(req, res, next) {
  const { supplier_id } = res.locals.supplier;
  const newSupplier = { ...req.body.data, supplier_id };
  service
    .update(newSupplier)
    .then((data) => res.json({ data }))
    .catch(next);
}

async function destroy(req, res, next) {
  res.sendStatus(204);
}

module.exports = {
  create: [hasOnlyValidProps, hasRequiredProps, create],
  update: [supplierExists, hasOnlyValidProps, hasRequiredProps, update],
  delete: destroy,
};
