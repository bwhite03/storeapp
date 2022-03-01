import React, { useEffect } from "react";
import UserTable from "../components/UserTable";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/storeActions";
import { fetchUsers } from "../api/User";

function UserPage() {
  const dispatch = useDispatch();
  const state = useSelector((app) => app.userReducer);

  useEffect(() => {
    fetchUsers()
      .then((res) => {
        const j = res.data;
        if (j.error === 0) {
          dispatch({ type: actions.SET_USERS, users: j.users });
        } else {
          console.log(j.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.refresh]);

  return (
    <div>
      <UserTable users={state.users} />
    </div>
  );
}

export default UserPage;
