import React from "react";
import { addStore } from "../api/Store";
import * as actions from "../store/actions/storeActions";
import { useDispatch, useSelector } from "react-redux";

function AddStore() {
  const dispatch = useDispatch();
  const state = useSelector((api) => api.newStoreReducer);

  const handleChange = (e) => {
    dispatch({
      type: actions.UPDATE_FORM_STATE,
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = () => {
    debugger;
    addStore(
      state.storeNumber,
      state.storeName,
      state.termCount,
      state.version,
      state.state,
      state.taxRate,
      state.groupId
    )
      .then((res) => {
        const j = res.data;
        if (j.error === 0) {
          console.log("Good");
        } else {
          console.log(j.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Store Number</label>
      <input name="storeNumber" type="number" onChange={handleChange} />
      <label>Store Name</label>
      <input name="storeName" type="text" onChange={handleChange} />
      <label>Term Count</label>
      <input name="termCount" type="number" onChange={handleChange} />
      <label>Version</label>
      <input name="version" type="number" onChange={handleChange} />
      <label>State</label>
      <input name="state" type="text" onChange={handleChange} />
      <label>Tax Rate</label>
      <input name="taxRate" type="number" onChange={handleChange} />
      <label>Group Id</label>
      <input name="groupId" type="number" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddStore;
