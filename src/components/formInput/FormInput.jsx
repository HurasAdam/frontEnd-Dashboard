import { useState } from "react";
import "./formInput.css";

export const FormInput = (props) => {
  const { label, errorMessage, onHandleChange, ...inputProps } = props;
  const [focused, setFocused] = useState(false);


  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      {inputProps.type === "radio" ? (
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
                
                onChange={(e)=>onHandleChange(e, inputProps)}
              />   
              
              <label
             for={option.value}
              className={option.label}
              >{option.label}</label>
              </div>
              ))}
       
          </div>
        </div>
      ) : (
        <>
          <label>{label}</label>
          <input
            {...inputProps}
            onBlur={(e) => handleFocus(e)}
            onChange={(e) => onHandleChange(e, inputProps)}
            focused={focused.toString()}
          />
        </>
      )}
      <span>{errorMessage}</span>
    </div>
  );
};
