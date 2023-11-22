const validator = require("validator");
 
 const validateFormField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
      case "surname":
        return !validator.isAlpha(value)
          ? `${fieldName} should only contain letters`
          : null;
      case "gender":
        const allowedGenders = ["male", "female"];
        return !allowedGenders.includes(value)
          ? "Incorrect gender type"
          : null;

          case "phone":
            return value!==''&&!validator.isNumeric(value)
            ?`${fieldName} should be a number`
            :null;

            case"country":
            return value!==""&&!validator.isAlpha(value)
            ?`${fieldName} should only contain letters`
            :null;

            case"city":
            return value!==""&&!validator.isAlpha(value)
            ?`${fieldName} should only contain letters`
            :null
      // Dodaj więcej przypadków dla innych pól
      default:
        return null;
    }
  };

  module.exports = {
    validateFormField
  };