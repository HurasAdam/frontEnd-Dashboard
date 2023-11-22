import validator from "validator";

export const validateUserForm = (fieldName, value) => {
  switch (fieldName) {
    case "country":
      return value !== "" && !validator.isAlpha(value)
        ? `${fieldName} should only contain letters`
        : null;

    case "city":
      return value !== "" && !validator.isAlpha(value)
        ? `${fieldName} should only contain letters`
        : null;

    case "phone":
      return value !== "" && !validator.isNumeric(value)
        ? `${fieldName} should be a number`
        : null;

    case "name":
    case "surname":
      if (!value || value.trim() === "") {
        return `${fieldName} is required`;
      }
      return !validator.isAlpha(value)
        ? `${fieldName} should only contain letters`
        : null;

    default:
      return null;
  }
};
