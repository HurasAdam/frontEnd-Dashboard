import { validateUserForm } from "../utils/validateUserForm";
import { handlePopup } from "./handlePopup";
export const handleUpdateUser = (
  e,
  { formData, responseData },
  mutation,
  popupSetter
) => {
  e.preventDefault();

  const { name, surname, gender, birthDay, country, city, phone } = formData;
  const {
    name: responseName,
    surname: responseSurname,
    gender: responseGender,
    birthDay: responseBirthday,
    country: responseCountry,
    city: responseCity,
    phone: responsePhone,
  } = responseData;

  const updateObj = {};
  const validationErrors = [];

  if (name !== responseName) {
    updateObj.name = name;
  }
  if (surname !== responseSurname) {
    updateObj.surname = surname;
  }
  if (gender !== responseGender) {
    updateObj.gender = gender;
  }
  if (birthDay !== responseBirthday) {
    updateObj.birthDay = birthDay;
  }
  if (country !== responseCountry) {
    updateObj.country = country;
  }
  if (city !== responseCity) {
    updateObj.city = city;
  }
  if (phone !== responsePhone) {
    updateObj.phone = phone;
  }

  Object.keys(updateObj).forEach((fieldName) => {
    const error = validateUserForm(fieldName, updateObj[fieldName]);
    if (error) {
      validationErrors.push(error);
    }
  });

  if (validationErrors.length > 0) {
    const errorObj = { message: validationErrors.join(", "), success: false };
    handlePopup(popupSetter, errorObj);
  } else if (Object.keys(updateObj).length === 0) {
    const errorObj = {
      message: "No changes were made. Make some changes to update the data.",
      success: false,
    };
    handlePopup(popupSetter,errorObj)
  } else {
    mutation.mutate(updateObj);
  }
};
