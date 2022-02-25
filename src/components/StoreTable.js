import React from "react";
import * as actions from "../store/actions/storeActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { headers } from "../utils";
import { storeDelete, test } from "../api/Store";

function StoreTable({ stores }) {
  const dispatch = useDispatch();
  const state = useSelector((app) => app.storeReducer);

  useEffect(() => {
    const newArray = stores.sort(compare);
    dispatch({ type: actions.UPDATE_FILTERED, filteredStores: newArray });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sortColumn, state.sortDirection]);

  const compare = (a, b) => {
    let type = "string";
    let field1 = a[state.sortColumn];
    let field2 = b[state.sortColumn];
    const dataType = headers.find((h) => h.columnName === state.sortColumn);
    if (dataType) {
      type = dataType.type;
    }

    if (type === "int") {
      field1 = Number(a[state.sortColumn]);
      field2 = Number(b[state.sortColumn]);
    }

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

  const handleDelete = (id) => {
    storeDelete(id)
      .then((res) => {
        const j = res.data;
        if (j.error === 0) {
          dispatch({ type: actions.REFRESH });
        } else {
          console.log(j.msg);
        }
      })
      .catch((error) => {
        debugger;
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      {stores && stores.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(stores[0]).map((store, i) => (
                <th key={i} onClick={() => handleSort(store)}>
                  {store}
                </th>
              ))}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id}>
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
                  <button onClick={() => handleDelete(store.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No Stores</h1>
      )}
    </React.Fragment>
  );
}

export default StoreTable;
