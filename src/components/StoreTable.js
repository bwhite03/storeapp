import React from "react";
import * as actions from "../store/actions/storeActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function StoreTable({ stores }) {
  const dispatch = useDispatch();
  const state = useSelector((app) => app.storeReducer);

  useEffect(() => {
    const newArray = stores.sort(compare);
    dispatch({ type: actions.UPDATE_FILTERED, filteredStores: newArray });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sortColumn, state.sortDirection]);

  const compare = (a, b) => {
    const field1 = a[state.sortColumn];
    const field2 = b[state.sortColumn];

    if (field1 > field2) {
      if (state.sortDirection === "asc") {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (state.sortDirection === "asc") {
        return -1;
      } else {
        return 1;
      }
    }
  };

  const handleSort = (col) => {
    dispatch({ type: actions.SET_SORT_COLUMN, sortColumn: col });
    if (state.sortDirection === "asc") {
      dispatch({ type: actions.SET_SORT_DIRECTION, sortDirection: "desc" });
    } else {
      dispatch({ type: actions.SET_SORT_DIRECTION, sortDirection: "asc" });
    }
  };

  return (
    <React.Fragment>
      {stores && stores.length > 0 ? (
        <table>
          <tr>
            {Object.keys(stores[0]).map((store) => (
              <th onClick={() => handleSort(store)}>{store}</th>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {stores.map((store) => (
            <tr>
              <td>{store.id}</td>
              <td>{store.storeNumber}</td>
              <td>{store.storeName}</td>
              <td>{store.termCount}</td>
              <td>{store.version}</td>
              <td>{store.state}</td>
              <td>{store.taxRate}</td>
              <td>{store.groupId}</td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <h1>No Stores</h1>
      )}
    </React.Fragment>
  );
}

export default StoreTable;
