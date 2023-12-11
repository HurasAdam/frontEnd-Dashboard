import { useState } from "react";
import "./formInput.css";
import Select from "react-select";
export const FormInput = (props) => {
  const {className,onHandleChange, label, errorMessage, ...inputProps } = props;
  const [focused, setFocused] = useState(false);



  const handleFocus = (e) => {
    setFocused(true);
  };

  if (inputProps.type === "textArea") {
    return (
      <div className="formInput">
        <textarea

     {...inputProps}
          cols="30"
          rows="10"
 
        ></textarea>
        <span>{errorMessage}</span>
      </div>
    );
  }

  if (inputProps.type === "radio") {
    return (
      <div className={className}>
        <div className="formInput-radioWrapper">
          <label>{label}</label>
          <div className="formInput-radio">
            {inputProps.options.map((option) => (
              <div className={`formInput-radio-option-${option.label}`}>
                <input
                  type="radio"
                  name={inputProps.name}
                  value={option.value}
                  id={option.value}
          
                />

                <label for={option.value} className={option.label}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <span>{errorMessage}</span>
      </div>
    );
  }

  if (
    inputProps.type === "email" ||
    inputProps.type === "text" ||
    inputProps.type === "password"
  ) {
    return (
      <div className={className}>
        <>
          <label>{label}</label>
          <input
            {...inputProps}
            onBlur={(e) => handleFocus(e)}
            onChange={(e)=>onHandleChange(e,inputProps)}
            focused={focused.toString()}
          />
        </>

        <span>{errorMessage}</span>
      </div>
    );
  }

  if (inputProps.type === "multipleSelect") {
    return (
      <div className="formInput">
        <Select
  
          {...inputProps.multiSelectProps}
      
          getOptionLabel={(option) => `${option.name} ${option.surname}`}
          getOptionValue={(option) => option._id}
        ></Select>
      </div>
    );
  }
};
