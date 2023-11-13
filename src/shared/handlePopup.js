export const handlePopup = (togglePopupSetter, data) => {


    togglePopupSetter((prevState) => ({
      ...prevState,
      message: data.message,
      success: data.success,
      visible: true,
    }));
  


    // setTimeout(() => {
    //   togglePopupSetter((prevState) => ({
    //     ...prevState,
    //     visible: false,
    //     message: '',
    //     success:null
    //   }));
    // }, 3500);
  };