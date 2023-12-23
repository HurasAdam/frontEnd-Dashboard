import { useState } from "react";
import "./formInput.css";
import Select from "react-select";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
export const FormInput = (props) => {
  const { className, onHandleChange, label, errorMessage, ...inputProps } =
    props;
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  console.log(inputProps)
  if (inputProps.type === "file") {
    return (
      <div className={`${className}-${inputProps.type}`}>
        <div className={`${className}-${inputProps.type}-action`}>
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
        <div className="attachedFile-list">
   { inputProps?.attachedFiles?.files.map((file,index)=>{
    return (<div className="attachedFile-list__item" >
      <ul>
        <li>
<InsertDriveFileIcon/>
          <span>{file.name}</span>
        <CloseOutlinedIcon
        className="delete-attachedFile"
        onClick={(e)=>inputProps.attachedFiles.onClick(e,index)}
        
        />
        </li>
      </ul>
    </div>)
   })}
   </div>
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
          rows="6"
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
            onChange={inputProps.onChange?inputProps.onChange:(e)=>onHandleChange(e,inputProps)}
            focused={focused.toString()}
          />
        </>

        <span>{errorMessage}</span>
      </div>
    );
  }

  if (inputProps.type === "Selects-flex") {
    return (
      <div className={className}>
        {inputProps?.selects.map((select) => (
          <div className="selectWrapper" key={select.id}>
            <label htmlFor="">{select.label}</label>
            {select.type==='visibility'?
            (<select {...select.selectProps}
            onChange={select.selectProps.onChange}
            >
              <option disabled selected value=''>{select.selectProps.placeholder}</option>
              {select?.selectProps?.options?.map((option,index) => (
                <option value={option?.value} key={index}>{option?.label}</option>
              ))}
            </select>):
            
            (   <select {...select.selectProps}
            onChange={select.selectProps.onChange}
            >
               <option disabled selected value=''>{select.selectProps.placeholder}</option>
              {select?.selectProps?.options?.map((option,index) => (
                <option value={option?._id} key={index}>{option?.name}</option>
              ))}
            </select>)
            
            }
          </div>
        ))}
      </div>
    );
  }
  
};
