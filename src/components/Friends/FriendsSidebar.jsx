import "./Friends.css";
import { useState } from "react";
import { useSetSelected } from "../../Utilities";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

export default function FriendsSidebar() {
  useSetSelected("friends");
  const {
    refreshVisibleChats,
    totalFriendRequests,
    setTotalFriendRequests,
    refreshTotalFriendRequests,
  } = useOutletContext();
  const [selected, setSelected] = useState();
  const navigate = useNavigate();

  return (
    <>
      <main className="friends">
        <aside>
          <ul className="options">
            <li
              className={selected === "online" ? "selected" : undefined}
              onClick={() => navigate("/friends/online")}
            >
              Online
            </li>
            <li
              className={selected === "all" ? "selected" : undefined}
              onClick={() => navigate("/friends/all")}
            >
              All
            </li>
            <li
              className={selected === "pending" ? "selected" : undefined}
              onClick={() => navigate("/friends/pending")}
            >
              Pending
              {totalFriendRequests > 99 && <span className="notification">99+</span>}
              {totalFriendRequests > 9 && totalFriendRequests < 100 && (
                <span className="notification">{totalFriendRequests}</span>
              )}
              {totalFriendRequests > 0 && totalFriendRequests < 10 && (
                <span
                  className="notification"
                  style={{ width: "1.1rem", height: "1.1rem", "font-size": "0.7rem" }}
                >
                  {totalFriendRequests}
                </span>
              )}
            </li>
            <li id="addFriendButton">
              <button
                className={selected === "new" ? "selected" : undefined}
                onClick={() => navigate("/friends/new")}
              >
                Add Friend
              </button>
            </li>
          </ul>
        </aside>

        <Outlet
          context={{
            setSelected,
            setTotalFriendRequests,
            refreshVisibleChats,
            refreshTotalFriendRequests,
          }}
        />
      </main>
    </>
  );
}
