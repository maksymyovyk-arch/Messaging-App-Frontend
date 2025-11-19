import "./Sidebar.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetUser } from "../../Utilities";
import { useCallback, useEffect, useState } from "react";
import UserAvatar from "../Avatar/UserAvatar";
import DMs from "./DMs";

export default function Sidebar() {
  const user = useGetUser();
  const [totalFriendRequests, setTotalFriendRequests] = useState();
  const [selected, setSelected] = useState();
  const [visibleChats, setVisibleChats] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    fetch("https://kweebac-messagingapp-api.up.railway.app/api/chat/visible", {
      credentials: "include",
      signal: abortController.signal,
    })
      .then((res) => {
        if (res.status === 401) navigate("/auth");
        return res.json();
      })
      .then((res) => setVisibleChats(res))
      .catch((error) => console.error(error));

    return () => {
      abortController.abort();
    };
  }, [navigate]);

  const refreshVisibleChats = useCallback(() => {
    fetch("https://kweebac-messagingapp-api.up.railway.app/api/chat/visible", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) navigate("/auth");
        return res.json();
      })
      .then((res) => setVisibleChats(res))
      .catch((error) => console.error(error));
  }, [navigate]);

  const refreshTotalFriendRequests = useCallback(
    async (abortController) => {
      const res = await fetch(
        "https://kweebac-messagingapp-api.up.railway.app/api/user/friendRequests",
        {
          credentials: "include",
          signal: abortController ? abortController.signal : undefined,
        }
      );
      if (res.status === 401) navigate("/auth");

      const friendRequests = await res.json();
      setTotalFriendRequests(friendRequests.incoming.length);
    },
    [navigate, setTotalFriendRequests]
  );

  useEffect(() => {
    const abortController = new AbortController();

    refreshTotalFriendRequests(abortController);

    return () => {
      abortController.abort();
    };
  }, [refreshTotalFriendRequests]);

  if (user && visibleChats)
    return (
      <>
        <aside className="mainSidebar">
          <section>
            <ul className="optionsList">
              <li
                className={selected === "friends" ? "selected" : undefined}
                onClick={() => navigate("/friends")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>Friends</title>
                  <path d="M1.5,4V5.5C1.5,9.65 3.71,13.28 7,15.3V20H22V18C22,15.34 16.67,14 14,14C14,14 13.83,14 13.75,14C9,14 5,10 5,5.5V4M14,4A4,4 0 0,0 10,8A4,4 0 0,0 14,12A4,4 0 0,0 18,8A4,4 0 0,0 14,4Z" />
                </svg>
                <p>Friends</p>
                {totalFriendRequests > 99 && <span className="notification">99+</span>}
                {totalFriendRequests > 0 && totalFriendRequests < 100 && (
                  <span
                    className="notification"
                    style={{ width: "1.1rem", height: "1.1rem", "font-size": "0.7rem" }}
                  >
                    {totalFriendRequests}
                  </span>
                )}
              </li>
            </ul>

            {/* <Groups /> */}
            <DMs
              visibleChats={visibleChats}
              refreshVisibleChats={refreshVisibleChats}
              selected={selected}
            />
          </section>

          <section className="userInfo">
            <li className="chat">
              <div>
                <UserAvatar user={user} />
                <div className="info accountInfo">
                  <div>{user.displayname}</div>
                  <div>{user.status}</div>
                </div>
              </div>
              <button onClick={() => navigate("/settings")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>User Settings</title>
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                </svg>
              </button>
            </li>
          </section>
        </aside>

        <Outlet
          context={{
            setSelected,
            refreshVisibleChats,
            totalFriendRequests,
            setTotalFriendRequests,
            refreshTotalFriendRequests,
          }}
        />
      </>
    );
}
