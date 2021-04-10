const ajv = require('ajv');
const { getSchema } = require('../service/schema');

const buildError = (e, code, status = 500) => {
    const err = new Error(e);
    err.code = code;
    err.status = status;
    return err;
  };


const ajValidator = ajv({ allErrors: true });

const validateSchemaAjv = (rootSchema, source = 'body') => (
  req,
  res,
  next,
) => {
  try {
    const ourschema = getSchema(rootSchema);
    if (!ourschema) {
      const error = buildError(`No schema found for ${rootSchema}`, 'ER-5010');
      error.status = 500;
      error.validationErrors = {
        body: `No schema found for ${rootSchema}`,
      };
      return next(error);
    }

    const validate = ajValidator.compile(ourschema);
    const result = validate(req[source]);
    if (!result) {
      const error = buildError(JSON.stringify(validate.errors), 'ER-4009', 400);
      error.status = 400;
      error.validationErrors = {
        body: validate.errors,
      };
      return next(error);
    }
    return next();
  } catch (error) {
    console.log(error);
    error.status = 400;
    return next(error);
  }
};

module.exports = validateSchemaAjv;
