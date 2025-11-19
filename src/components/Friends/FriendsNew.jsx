import { useNavigate } from "react-router-dom";
import { useSetSelected } from "../../Utilities";
import "./Friends.css";
import { useState } from "react";

export default function FriendsNew() {
  useSetSelected("new");
  const [errors, setErrors] = useState();
  const [success, setSuccess] = useState(false);
  const [userFriendRequested, setUserFriendRequested] = useState();
  const navigate = useNavigate();

  async function sendFriendRequest(e) {
    e.preventDefault();
    setErrors(undefined);
    setSuccess(undefined);

    let input = e.target[0];
    setUserFriendRequested(input.value);

    const formData = new FormData();
    formData.append("username", input.value.toLowerCase());

    const res = await fetch(
      "https://kweebac-messagingapp-api.up.railway.app/api/user/friendRequests/send",
      {
        method: "PUT",
        body: new URLSearchParams(formData),
        credentials: "include",
      }
    );
    if (res.status === 401) navigate("/auth");

    const errors = await res.json();
    if (errors) setErrors(errors);
    else {
      setSuccess(true);
      input.value = "";
    }
  }

  return (
    <section className="addFriend">
      <div>
        <h1 className="title">ADD FRIEND</h1>
        <form onSubmit={(e) => sendFriendRequest(e)}>
          <input
            className={success ? "success" : undefined}
            autoFocus
            type="text"
            name="username"
            placeholder="You can add friends with their Discord username."
          />
          {errors && (
            <ul className="errors">
              {errors.map((error, index) => (
                <li key={index}>{error.msg}</li>
              ))}
            </ul>
          )}
          {success && (
            <div style={{ color: "#359356" }}>
              Success! Your friend request to <strong>{userFriendRequested}</strong> was sent.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
