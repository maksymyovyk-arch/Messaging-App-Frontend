import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Chat.css";

export default function MessageActions({
  chatId,
  message,
  username,
  getChat,
  setEdittedMessage,
}) {
  const navigate = useNavigate();

  async function deleteMessage() {
    const res = await fetch(
      `https://kweebac-messagingapp-api.up.railway.app/api/chat/message/${message._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
        }),
        credentials: "include",
      }
    );
    if (res.status === 401) navigate("/auth");

    getChat(username);
  }

  return (
    <ul className="messageActions">
      <li onClick={() => setEdittedMessage(message)} className="messageAction edit">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Edit</title>
          <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
        </svg>
      </li>
      <li
        onClick={async () => {
          await deleteMessage();
        }}
        className="messageAction delete"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Delete</title>
          <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
        </svg>
      </li>
    </ul>
  );
}

MessageActions.propTypes = {
  chatId: PropTypes.string,
  message: PropTypes.object,
  username: PropTypes.string,
  getChat: PropTypes.func,
  setEdittedMessage: PropTypes.func,
};
