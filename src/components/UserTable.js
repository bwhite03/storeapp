import React, { useEffect, useState } from "react";
import * as actions from "../store/actions/storeActions";
import { userUpdate, userDelete } from "../api/User";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { formatDate } from "../utils";
import "react-datepicker/dist/react-datepicker.css";

function UserTable({ users }) {
  const dispatch = useDispatch();
  const state = useSelector((app) => app.userReducer);

  useEffect(() => {
    if (state.sortColumn !== "") {
      const sortCopy = state.users.sort(compare);
      console.log(sortCopy);
      dispatch({
        type: actions.SET_SORT_USERS,
        filteredUsers: sortCopy,
      });
    }
  }, [state.sortColumn, state.sortDirection]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: actions.EDITING_CHANGE, name, value });
  };

  const handleDatePicker = (e) => {
    dispatch({
      type: actions.EDITING_CHANGE,
      name: "hireDate",
      value: formatDate(e),
    });
  };

  const handleEdit = (user) => {
    if (state.isEditing) {
      userUpdate(state.editingRecord)
        .then((res) => {
          const j = res.data;
          if (j.error === 0) {
            dispatch({ type: actions.END_EDITING });
            dispatch({ type: actions.REFRESH });
          } else {
            console.log(j.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      dispatch({
        type: actions.END_EDITING,
        isEditing: false,
        editingRecord: {},
      });
    } else {
      dispatch({
        type: actions.START_EDITING,
        isEditing: true,
        editingRecord: user,
      });
    }
  };

  const handleDelete = (id) => {
    userDelete(id)
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

  const compare = (a, b) => {
    const sortColumn = state.sortColumn;
    const aColName = a[sortColumn];
    const bColName = b[sortColumn];

    console.log(state.sortDirection);
    if (aColName > bColName) {
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
      {users && users.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(users[0]).map((user, i) => (
                <th key={i} onClick={() => handleSort(user)}>
                  {user}
                  {users.sortDirection === "asc" ? (
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
            {state.filteredUsers.map((user, i) => {
              if (state.isEditing && state.editingRecord.id === user.id) {
                return (
                  <tr key={i}>
                    <td>{user.id}</td>
                    <td>
                      <input
                        onChange={handleOnChange}
                        name="username"
                        type="text"
                        value={state.editingRecord.username}
                      />
                    </td>
                    <td>
                      <input
                        onChange={handleOnChange}
                        name="email"
                        type="text"
                        value={state.editingRecord.email}
                      />
                    </td>
                    <td>
                      <DatePicker
                        selected={new Date(state.editingRecord.hireDate)}
                        onChange={handleDatePicker}
                        name="hireDate"
                      />
                      {/* <input
                        onChange={handleOnChange}
                        name="hireDate"
                        type="text"
                        value={state.editingRecord.hireDate}
                      /> */}
                    </td>
                    <td>
                      <input
                        onChange={handleOnChange}
                        name="username"
                        type="text"
                        value={state.editingRecord.jobTitle}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleEdit(user)}>
                        {state.isEditing && state.editingRecord.id === user.id
                          ? "Save"
                          : "Edit"}
                      </button>
                    </td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{formatDate(user.hireDate)}</td>
                    <td>{user.jobTitle}</td>
                    <td>
                      <button onClick={() => handleEdit(user)}>
                        {state.isEditing && state.editingRecord.id === user.id
                          ? "Save"
                          : "Edit"}
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(user.id)}>
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
        <h1>No Users</h1>
      )}
    </React.Fragment>
  );
}

export default UserTable;
