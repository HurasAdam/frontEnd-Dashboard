const validator = require("validator");

const validateUserData = ({ formData, userData }, fieldConfig) => {


  const result = {
    success: true,
    error: {
      message: [],
    },
    updateObj: {},
  };

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
            result.success=false
            result.error.message.push("Incorrect gender type");
          } else if (value !== userData[fieldName]) {
            result.updateObj[fieldName] = value;
           
          }
          break;
        case "phone":
          if (value !== "" && !validator.isNumeric(value)) {
            result.error.message.push(`${fieldName} should be a number`);
          } else if (value !== userData[fieldName]) {
            result.updateObj[fieldName] = value;
          }
          break;
        case "country":
        case "city":
          if (value !== "" && !validator.isAlpha(value)) {
            result.error.message.push(
              `${fieldName} should only contain letters`
            );
          } else if (value !== userData[fieldName]) {
            result.updateObj[fieldName] = value;
          }
          break;

        default:
          break;
      }
    }
  });

  return result;
};

module.exports = {
  validateUserData,
};
