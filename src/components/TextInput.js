import React from "react";

function TextInput(props) {
  let wrapperClass = "form-group";

  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <input
          id={props.id}
          type={props.type}
          onChange={props.onChange}
          name={props.name}
          className="form-control"
          value={props.value}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
        />
      </div>
      {props.error && <div className="alert-danger">{props.error}</div>}
    </div>
  );
}

TextInput.defaultProps = { error: "" };
export default TextInput;
