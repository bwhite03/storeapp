import React, { useState, useEffect } from "react";
import { fetchStores } from "../api/Store";
import StoreTable from "../components/StoreTable";
import AddStore from "../components/AddStore";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/storeActions";

function HomePage() {
  const dispatch = useDispatch();
  const state = useSelector((app) => app.storeReducer);

  useEffect(() => {
    fetchStores().then((res) => {
      const j = res.data;
      if (j.error === 0) {
        dispatch({ type: actions.SET_STORE, stores: j.stores });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <StoreTable stores={state.filteredStores} />
      <AddStore />
    </div>
  );
}

export default HomePage;
