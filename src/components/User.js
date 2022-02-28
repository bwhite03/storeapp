import React from "react";
import { fetchUser } from "../api/User";
import { useState } from "react";

function User() {
  const [user, setUser] = useState([]);
  const [userValue, setUserValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser(userValue)
      .then((res) => {
        const j = res.data;
        if (j.error === 0) {
          setUser(j.users);
        } else {
          console.log(j.msg);
        }
      })
      .catch((error) => console.log(error));

    setUserValue("");
  };

  const handleChange = (e) => {
    setUserValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Search User</label>
        <input type="text" value={userValue} onChange={handleChange} />
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
      {user.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(user[0]).map((user, i) => (
                <th key={i}>{user}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {user.map((user, i) => (
              <tr key={i}>
                <td>{user.id}</td>
                <td>{user.storeName}</td>
                <td>{user.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No user</h1>
      )}
    </div>
  );
}

export default User;
