import React from "react";
import { useEffect } from "react";
import { addStore } from "../api/Store";
import * as actions from "../store/actions/storeActions";
import { useDispatch, useSelector } from "react-redux";

function AddStore() {
  const dispatch = useDispatch();
  const state = useSelector((api) => api.newStoreReducer);
  const appState = useSelector((api) => api.storeReducer);

  useEffect(() => {
    console.log("Refresh");
  }, [appState.refresh]);

  const handleChange = (e) => {
    dispatch({
      type: actions.UPDATE_FORM_STATE,
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log("Test");
    e.preventDefault();
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
          dispatch({ type: actions.REFRESH });
        } else {
          console.log(j.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Store Number</label>
      <input
        name="storeNumber"
        type="number"
        value={state.storeNumber}
        onChange={handleChange}
      />
      <label>Store Name</label>
      <input
        name="storeName"
        type="text"
        value={state.storeName}
        onChange={handleChange}
      />
      <label>Term Count</label>
      <input
        name="termCount"
        type="number"
        value={state.termCount}
        onChange={handleChange}
      />
      <label>Version</label>
      <input
        name="version"
        type="number"
        value={state.version}
        onChange={handleChange}
      />
      <label>State</label>
      <input
        name="state"
        type="text"
        value={state.state}
        onChange={handleChange}
      />
      <label>Tax Rate</label>
      <input
        name="taxRate"
        type="number"
        value={state.taxRate}
        onChange={handleChange}
      />
      <label>Group Id</label>
      <input
        name="groupId"
        type="number"
        value={state.groupId}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddStore;
