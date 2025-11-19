import { useCallback, useEffect, useState } from "react";
import { changeVisibleStatus, useSetSelected } from "../../Utilities";
import "./Friends.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import UserAvatar from "../Avatar/UserAvatar";

export default function FriendsAll() {
  const { refreshVisibleChats } = useOutletContext();
  const [friends, setFriends] = useState();
  const navigate = useNavigate();
  useSetSelected("all");

  const refreshFriends = useCallback(
    async (abortController) => {
      const res = await fetch(
        "https://kweebac-messagingapp-api.up.railway.app/api/user/friends?" +
          new URLSearchParams({
            type: "all",
          }),
        {
          credentials: "include",
          signal: abortController ? abortController.signal : undefined,
        }
      );
      if (res.status === 401) navigate("/auth");

      const friends = await res.json();
      setFriends(friends);
    },
    [navigate]
  );

  useEffect(() => {
    const abortController = new AbortController();

    refreshFriends(abortController);

    return () => {
      abortController.abort();
    };
  }, [refreshFriends]);

  async function removeFriend(userId) {
    const res = await fetch(
      `https://kweebac-messagingapp-api.up.railway.app/api/user/friends/${userId}/remove`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.status === 401) navigate("/auth");

    refreshFriends();
  }

  if (friends)
    return (
      <section className="filteredFriendsList">
        <ul>
          {friends.map((friend, index) => (
            <li key={index}>
              <div className="info">
                <UserAvatar user={friend} />
                <div>
                  <p className="title">{friend.displayname}</p>
                  <p>{friend.visibility === "offline" ? "Offline" : friend.status}</p>
                </div>
              </div>
              <div className="actions">
                <div
                  onClick={async () => {
                    await changeVisibleStatus(friend._id, true, navigate);
                    refreshVisibleChats();
                  }}
                >
                  <svg
                    className="message"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <title>Message</title>
                    <path d="M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3Z" />
                  </svg>
                </div>
                <div
                  onClick={async () => {
                    await removeFriend(friend._id);
                    refreshVisibleChats();
                  }}
                >
                  <svg
                    className="decline"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <title>Remove</title>
                    <path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
                  </svg>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
}
