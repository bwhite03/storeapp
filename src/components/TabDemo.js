import React from "react";
import Tabs from "./Tabs";

function TabDemo() {
  return (
    <div>
      <Tabs>
        <div label="tab1">
          <h2>Tab1</h2>
        </div>
        <div label="tab2">
          <h2>Tab2</h2>
        </div>
        <div label="tab3">
          <h2>Tab3</h2>
        </div>
      </Tabs>
    </div>
  );
}

export default TabDemo;
