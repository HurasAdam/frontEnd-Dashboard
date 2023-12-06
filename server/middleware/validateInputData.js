const validator = require("validator");

const validateInputData = async (req, res, next) => {
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
    newEmail: { required: true },
    confirmNewEmail: { required: true },
    password: { required: true },
    leader:{required:true}
  };
  const formData = req.body;
  const result = {
    success: true,
  
      message: [],
 
  };

  Object.keys(formData).forEach((fieldName) => {
    const value = formData[fieldName];
    const config = fieldConfig[fieldName];

    if (!fieldConfig[fieldName]) {
      result.success = false;
      result.message.push(`Unexpected field: ${fieldName}`);
      return;
    }

    if (
      config &&
      config.required &&
      (value === undefined || value === null || value === "")
    ) {
      result.success = false;
      result.message.push(`${fieldName} is required`);

      return;
    }
    if (value) {
      switch (fieldName) {
        case "name":
        case "surname":
          if (typeof value !== "string" || !validator.isAlpha(value)) {
            result.success = false;
            result.message.push(
              `${fieldName} should only contain letters`
            );
          }

          break;
        case "gender":
          const allowedGenders = ["male", "female"];
          if (!allowedGenders.includes(value)) {
            result.success = false;
            result.message.push("Incorrect gender type");
          }
          break;
        case "phone":
          if (value !== "" && !validator.isNumeric(value)) {
            result.success = false;
            result.message.push(`${fieldName} should be a number`);
          }
          break;
        case "country":
        case "city":
          if (typeof value !== "string" || !validator.isAlpha(value)) {
            result.success = false;
            result.message.push(
              `${fieldName} should only contain letters`
            );
          }
          break;
        case "title":
          if (typeof value !== "string" || !validator.isAlpha(value)) {
            result.success = false;
            result.message.push(
              `${fieldName} should only contain letters`
            );
          }
          break;
        case "description":
          if (typeof value !== "string" || !validator.isAlpha(value)) {
            result.success = false;
            result.message.push(
              `${fieldName} should only contain letters`
            );
          }
          break;
        case "contributors":
          if (!Array.isArray(value)) {
            result.success = false;
            result.message.push("inncorect contributor type");
          }

        case "newEmail":
        case "confirmNewEmail":
          if (typeof value !== "string" || !validator.isEmail(value)) {
            result.success = false;
            result.message.push(`${fieldName}:inncorrect email type`);
          }     
          break;

          case"password":
          if(typeof value !=="string"){
            result.success=false;
            result.message.push('inncorect type of password')
          }

        default:
          break;
      }
    }
  });

  if (!result.success) return res.status(400).json(result);
  else {
    req.formData = formData;
    next();
  }
};

module.exports = { validateInputData };
