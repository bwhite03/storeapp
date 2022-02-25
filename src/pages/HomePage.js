import React, { useState, useEffect } from "react";
import { fetchStores } from "../api/Store";
import StoreTable from "../components/StoreTable";
import AddStore from "../components/AddStore";
import User from "../components/User";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/storeActions";

function HomePage() {
  const dispatch = useDispatch();
  const state = useSelector((app) => app.storeReducer);

  useEffect(() => {
    fetchStores()
      .then((res) => {
        const j = res.data;
        if (j.error === 0) {
          dispatch({ type: actions.SET_STORE, stores: j.stores });
        } else {
          console.log(j.msg);
        }
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.refresh]);

  return (
    <div>
      <StoreTable stores={state.filteredStores} />
      <AddStore />
      <User />
    </div>
  );
}

export default HomePage;
