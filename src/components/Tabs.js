import React, { useState } from "react";
import Tab from "./Tab";
import "./tabs.css";

function Tabs(props) {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  const handleTabClick = (tab) => {
    setActiveTab(tab.label);
  };
  return (
    <div className="tabs">
      <ol className="tablists">
        {props.children.map((child, i) => (
          <Tab
            activeTab={activeTab}
            key={`tab-li-${i}`}
            label={child.props.label}
            disabled={child.props.disabled}
            onClick={handleTabClick}
            id={child.props.id}
          />
        ))}
      </ol>
      <div className="tab-content">
        {props.children.map((child) => {
          if (child.props.label !== activeTab) {
            return undefined;
          }
          return child.props.children;
        })}
      </div>
    </div>
  );
}

export default Tabs;
