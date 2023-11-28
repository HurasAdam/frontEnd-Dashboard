const validator = require("validator");

const validateInputData = async (req, res, next) => {
  const formData = req.body;
  const userData = req.user;

  const fieldConfig = {
    name: { required: true },
    surname: { required: true },
    gender: { required: true },
    phone: { required: false },
    city: { required: false },
    country: { required: false },
    title: { required: true },
    description: { required: true },
    contributors: { required: true },
  };

  const result = {
    success: true,
    error: {
      message: [],
    },
    updateObj: {},
  };

  req.update = result?.updateObj;

  Object.keys(formData).forEach((fieldName) => {
    const value = formData[fieldName];
    const config = fieldConfig[fieldName];

    if (
      config.required &&
      (value === undefined || value === null || value === "")
    ) {
      result.success = false;
      result.error.message.push(`${fieldName} is required`);

      return;
    }
    if (value) {
      switch (fieldName) {
        case "name":
        case "surname":
          if (!validator.isAlpha(value)) {
            result.success = false;
            result.error.message.push(
              `${fieldName} should only contain letters`
            );
          } else if (value !== userData[fieldName]) {
            result.updateObj[fieldName] = value;
          }

          break;
        case "gender":
          const allowedGenders = ["male", "female"];
          if (!allowedGenders.includes(value)) {
            result.success = false;
            result.error.message.push("Incorrect gender type");
          } else if (value !== userData[fieldName]) {
            result.updateObj[fieldName] = value;
          }
          break;
        case "phone":
          if (value !== "" && !validator.isNumeric(value)) {
            result.success = false;
            result.error.message.push(`${fieldName} should be a number`);
          } else if (value !== userData[fieldName]) {
            result.updateObj[fieldName] = value;
          }
          break;
        case "country":
        case "city":
          if (value !== "" && !validator.isAlpha(value)) {
            result.success = false;
            result.error.message.push(
              `${fieldName} should only contain letters`
            );
          } else if (value !== userData[fieldName]) {
            result.updateObj[fieldName] = value;
          }
          break;
        case "title":
          if (!validator.isAlpha(value)) {
            result.success = false;
            result.error.message.push(
              `${fieldName} should only contain letters`
            );
          } else if (value !== userData[fieldName]) {
            result.updateObj[fieldName] = value;
          }
          break;
          case"description":
          if(!validator.isAlpha(value)){
            result.success=false;
            result.error.message.push(`${fieldName} should only contain letters`)
          }
          break;
          case "contributors":
            console.log(Array.isArray(value))
            if(!Array.isArray(value)){
                result.success=false;
                result.error.message.push("inncorect contributor type")
            }
            else if(Array.isArray(value)){
                result.updateObj[fieldName]=value
            }
            break;

        default:
          break;
      }
    }
  });

  if (!result.success)
    return res.status(400).json({ ...result, updateObj: null });
  else if (Object.keys(result.updateObj).length === 0) {
    return res.status(400).json("No changes has been made");
  } else if (result.success) {
    next();
  }
};

module.exports = { validateInputData };
