import React from "react";
import * as actions from "../store/actions/storeActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { headers } from "../utils";
import { storeDelete, storeUpdate } from "../api/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

function StoreTable({ stores }) {
  const dispatch = useDispatch();
  const state = useSelector((app) => app.storeReducer);

  useEffect(() => {
    const newArray = stores.sort(compare);
    dispatch({ type: actions.UPDATE_FILTERED, filteredStores: newArray });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sortColumn, state.sortDirection, state.refresh]);

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
        console.log(error);
      });
  };

  const handleEdit = (store) => {
    if (state.isEditing) {
      storeUpdate(state.editingRecord)
        .then((res) => {
          const j = res.data;
          if (j.error === 0) {
            dispatch({ type: actions.END_EDITING });
          } else {
            console.log(j.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      return;
    }

    dispatch({
      type: actions.START_EDITING,
      isEditing: true,
      editingRecord: store,
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: actions.EDITING_CHANGE, name, value });
  };

  const handleChangeFilter = (e) => {
    const { value } = e.target;
    dispatch({ type: actions.FILTER_CHANGE, value });
  };

  return (
    <React.Fragment>
      <div className="store-filter">
        <label>Search Store Name</label>
        <input type="text" onChange={handleChangeFilter} />
      </div>
      {stores && stores.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(stores[0]).map((store, i) => (
                <th key={i} onClick={() => handleSort(store)}>
                  {store}
                  {state.sortDirection === "asc" ? (
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ marginLeft: "5px" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faAngleUp}
                      style={{ marginLeft: "5px" }}
                    />
                  )}
                </th>
              ))}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => {
              if (state.isEditing && state.editingRecord.id === store.id) {
                return (
                  <tr key={store.id}>
                    <td>{store.id}</td>
                    <td>{store.storeNumber}</td>
                    <td>
                      <input
                        onChange={handleOnChange}
                        name="storeName"
                        type="text"
                        value={state.editingRecord.storeName}
                      />
                    </td>
                    <td>
                      <input
                        onChange={handleOnChange}
                        name="termCount"
                        type="text"
                        value={state.editingRecord.termCount}
                      />
                    </td>
                    <td>{store.version}</td>
                    <td>
                      <select
                        onChange={handleOnChange}
                        name="state"
                        value={state.editingRecord.state}
                      >
                        {state.states.length > 0 ? (
                          <React.Fragment>
                            {state.states.map((state, i) => (
                              <option key={i} value={state.abr}>
                                {state.name}
                              </option>
                            ))}
                          </React.Fragment>
                        ) : null}
                      </select>
                    </td>
                    <td>
                      <input
                        onChange={handleOnChange}
                        name="taxRate"
                        type="text"
                        value={state.editingRecord.taxRate}
                      />
                    </td>
                    <td>{store.groupId}</td>
                    <td>
                      <button onClick={() => handleEdit(store)}>
                        {state.isEditing && state.editingRecord.id === store.id
                          ? "Save"
                          : "Edit"}
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(store.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              } else {
                return (
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
                      <button onClick={() => handleEdit(store)}>
                        {state.isEditing && state.editingRecord.id === store.id
                          ? "Save"
                          : "Edit"}
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(store.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      ) : (
        <h1>No Stores</h1>
      )}
    </React.Fragment>
  );
}

export default StoreTable;
