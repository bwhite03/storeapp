import React from "react";

function SelectField(props) {
  let wrapperClass = "form-group";
  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }
  return (
    <div className={wrapperClass}>
      <label htmlfor={props.id}>{props.label}</label>
      <div className="field">
        <select
          id={props.id}
          onChange={props.onChange}
          name={props.name}
          className="form-control"
        >
          <option value="0">{props.emptyMessage}</option>
          {props.data && props.data.length === 0
            ? null
            : props.data.map((item, i) => (
                <option key={i} value={item[props.valueField]}>
                  {item[props.displayField]}
                </option>
              ))}
        </select>
      </div>
      {props.error.length === 0 ? null : (
        <div className="alert alert-danger">{props.error}</div>
      )}
    </div>
  );
}
SelectField.defaultProps = {
  error: "",
};

export default SelectField;
