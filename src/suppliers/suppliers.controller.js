const service = require("./suppliers.service.js");
const hasProperties = require("../errors/hasProperties");
const errBound = require("../errors/asyncErrorBoundary");

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
async function supplierExists(req, res, next) {
  const supplier = await service.read(req.params.supplierId);
  if (!supplier)
    return next({ status: 404, message: `Supplier cannot be found.` });
  res.locals.supplier = supplier;
  return next();
}

/**************************** CRUDL Operation Handlers ****************************/
async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res, next) {
  const { supplier_id } = res.locals.supplier;
  const newSupplier = { ...req.body.data, supplier_id };

  const data = await service.update(newSupplier);
  res.json({ data });
}

async function destroy(req, res, next) {
  const { supplier_id } = res.locals.supplier;
  await service.delete(supplier_id);
  res.sendStatus(204);
}

module.exports = {
  create: [hasOnlyValidProps, hasRequiredProps, errBound(create)],
  update: [
    errBound(supplierExists),
    hasOnlyValidProps,
    hasRequiredProps,
    errBound(update),
  ],
  delete: [errBound(supplierExists), errBound(destroy)],
};
