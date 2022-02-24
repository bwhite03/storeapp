import React, { useState, useEffect } from "react";
import { fetchStores } from "../api/Store";
import StoreTable from "../components/StoreTable";
import { useDispatch, useSelector } from "react-redux";
import { storeReducer } from "../store/reducers/storeReducer";
import * as actions from "../store/actions/storeActions";

function HomePage() {
  const dispatch = useDispatch();
  const state = useSelector((app) => app.storeReducer);

  useEffect(() => {
    fetchStores().then((res) => {
      const j = res.data;
      if (j.error === 0) {
        dispatch({ type: actions.SET_STORE, stores: j.data });
      }
    });
  }, []);

  return (
    <div>
      {state &&
        state.map((store) => <div key={store.id}>{store.storeName}</div>)}
      <p>test</p>
    </div>
  );
}

export default HomePage;
