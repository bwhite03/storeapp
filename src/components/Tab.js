import React from "react";

function Tab(props) {
  let className = "tablist-item";
  if (props.label === props.activeTab) {
    className += " tablist-active";
  } else {
    // className += " tablist-disabled";
  }

  return (
    <li
      id={props.id}
      className={className}
      onClick={() => props.onClick(props)}
    >
      {props.label}
    </li>
  );
}

export default Tab;
