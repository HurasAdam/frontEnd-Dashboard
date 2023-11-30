import { handlePopup } from "./handlePopup";
export const handleUpdateEmail = (e, userForm, mutation, popupSetter) => {
  e.preventDefault();
  const errorObj = [];

  const { newEmail, confirmNewEmail, password } = userForm;

  if (!newEmail) {
    const error = "new email is reqired";
    errorObj.push(error);
  }

   if (!confirmNewEmail) {
    const error = "confirm new email";
    errorObj.push(error);
  }

  else if (newEmail !== confirmNewEmail) {
    const error = "new email and confirmed new email are different";
    errorObj.push(error);
  }

  else if (!password) {
    const error = "password is required";
    errorObj.push(error);
  }

   if (errorObj.length > 0) {
    const errorObject = {
      message: errorObj,
      succes: false,
    };
   return handlePopup(popupSetter, errorObject);
  } else {
    mutation.mutate(userForm);
  }
};
