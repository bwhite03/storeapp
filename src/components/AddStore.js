import React from "react";
import { useEffect, useState } from "react";
import { addStore } from "../api/Store";
import * as actions from "../store/actions/storeActions";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./TextInput";
import "./addstore.css";
import { toast } from "react-toastify";
import SelectField from "./SelectField";

function AddStore() {
  const dispatch = useDispatch();
  const state = useSelector((api) => api.newStoreReducer);
  const appState = useSelector((api) => api.storeReducer);
  const [errors, setErrors] = useState({});

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

  const formIsValid = () => {
    const _errors = {};
    if (!state.storeNumber) _errors.storeNumber = "Store number is required";
    if (!state.storeName) _errors.storeName = "Store name is required";
    if (!state.termCount) _errors.termCount = "Term count is required";
    if (!state.version) _errors.version = "Version is required";
    if (!state.taxRate) _errors.taxRate = "Tax rate is required";
    if (!state.groupId) _errors.groupId = "Group id is required";
    if (state.state !== 0) _errors.state = "State is required";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
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
          toast.success("Successful");
          dispatch({ type: actions.REFRESH });
        } else {
          toast.warn(j.msg);
          dispatch({ type: actions.REFRESH });
          console.log(j.msg);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const warn = () => {
    toast.warn("test");
  };

  const error = () => {
    toast.error("test");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={warn}>Warn</button>
      <button onClick={error}>Error</button>
      <TextInput
        type="text"
        label="Store Number"
        id="storeNumber"
        name="storeNumber"
        value={state.storeNumber}
        placeholder="Store Number"
        onChange={handleChange}
        error={errors.storeNumber}
      />
      <TextInput
        type="text"
        label="Store Name"
        id="storeName"
        name="storeName"
        value={state.storeName}
        placeholder="Store Name"
        onChange={handleChange}
        error={errors.storeName}
      />
      <TextInput
        type="text"
        label="Term Count"
        id="termCount"
        name="storeName"
        value={state.termCount}
        placeholder="Term Count"
        onChange={handleChange}
        error={errors.termCount}
      />
      <TextInput
        type="text"
        label="Version"
        id="version"
        name="version"
        value={state.version}
        placeholder="Version"
        onChange={handleChange}
        error={errors.version}
      />
      <SelectField
        id="state"
        name="state"
        label="state"
        onChange={handleChange}
        valueField="abr"
        displayField="name"
        data={appState.states}
        emptyMessage="Select a state"
        error={errors.state}
      />
      <TextInput
        type="text"
        label="Tax Rate"
        id="taxRate"
        name="taxRate"
        value={state.taxRate}
        placeholder="Tax Rate"
        onChange={handleChange}
        error={errors.taxRate}
      />
      <TextInput
        type="text"
        label="Group Id"
        id="groupId"
        name="groupId"
        value={state.groupId}
        placeholder="Group Id"
        onChange={handleChange}
        error={errors.groupId}
      />
      <button className="submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
}

export default AddStore;
