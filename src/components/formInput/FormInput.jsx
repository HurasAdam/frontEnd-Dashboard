import { useState } from "react";
import "./formInput.css";
import Select from "react-select";
import AttachFileIcon from "@mui/icons-material/AttachFile";
export const FormInput = (props) => {
  const { className, onHandleChange, label, errorMessage, ...inputProps } =
    props;
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  if (inputProps.type === "file") {
    return (
      <div className={`${className}-${inputProps.type}`}>
        <input id="file" className="file-input" type={inputProps.type}
    onChange={inputProps.onChange}
        />
       <p>{label}</p>
        <label
        {...inputProps}
        htmlFor="file" className="file-input-label">
          <AttachFileIcon className="file-input-label__icon" />
        </label>
      </div>
    );
  }

  if (inputProps.type === "textArea") {
    return (
      <div className={className}>
        <label>{label}</label>
        <textarea
          onBlur={(e) => handleFocus(e)}
          focused={focused.toString()}
          {...inputProps}
          cols="30"
          rows="12"
        ></textarea>
        <span>{errorMessage}</span>
      </div>
    );
  }

  if (inputProps.type === "radio") {
    return (
      <div className={className}>
        <div className={`${className}-radioWrapper`}>
          <label>{label}</label>
          <div className={`${className}-radio`}>
            {inputProps.options.map((option) => (
              <div className={`${className}-radio-option-${option.label}`}>
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
            // onChange={(e)=>onHandleChange(e,inputProps)}
            focused={focused.toString()}
          />
        </>

        <span>{errorMessage}</span>
      </div>
    );
  }

  if (inputProps.type === "multipleSelect") {
    return (
      <div className={className}>
        <Select
          {...inputProps.multiSelectProps}
          getOptionLabel={(option) => `${option.name} ${option.surname}`}
          getOptionValue={(option) => option._id}
        ></Select>
      </div>
    );
  }
};
