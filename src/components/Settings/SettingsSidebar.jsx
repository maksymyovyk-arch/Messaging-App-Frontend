import "./Settings.css";
import { useIsAuthenticated } from "../../Utilities";
import PropTypes from "prop-types";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SettingsSidebar() {
  const [selected, setSelected] = useState();
  const navigate = useNavigate();
  useIsAuthenticated();

  async function handleLogout(e) {
    e.preventDefault();

    let res = await fetch("https://kweebac-messagingapp-api.up.railway.app/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    res = await res.json();

    if (res === true) navigate("/auth");
  }

  return (
    <div className="settings">
      <aside>
        <h1 className="title">USER SETTINGS</h1>
        <ul>
          <li>
            <button
              className={selected === "account" ? "selected" : undefined}
              onClick={() => navigate("/settings/account")}
            >
              Account
            </button>
          </li>
          <li>
            <button
              className={selected === "profile" ? "selected" : undefined}
              onClick={() => navigate("/settings/profile")}
            >
              Profile
            </button>
          </li>
          <hr />
          <li>
            <button onClick={(e) => handleLogout(e)}>Logout</button>
          </li>
        </ul>
      </aside>
      <Outlet context={{ setSelected }} />
    </div>
  );
}

SettingsSidebar.propTypes = {
  selected: PropTypes.string,
};
