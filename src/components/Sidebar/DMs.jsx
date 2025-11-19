import UserAvatar from "../Avatar/UserAvatar";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { changeVisibleStatus } from "../../Utilities";
import PropTypes from "prop-types";

export default function DMs({ visibleChats, refreshVisibleChats, selected }) {
  const navigate = useNavigate();

  if (visibleChats)
    return (
      <div className="DM">
        <h1>
          <span className="title">DIRECT MESSAGES</span>
          <svg className="plusButton" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Create DM</title>
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
        </h1>
        <ul className="chats">
          {visibleChats.map((visibleChat) => {
            const classNames =
              selected === visibleChat.friend.username ? "chat selected" : "chat";

            return (
              <li
                className={classNames}
                key={visibleChat._id}
                onClick={() => navigate(`/chat/${visibleChat.friend.username}`)}
              >
                <div>
                  <UserAvatar user={visibleChat.friend} />
                  <div className="info">
                    <div>{visibleChat.friend.displayname}</div>
                    <div>{visibleChat.friend.status}</div>
                  </div>
                  {visibleChat.unread > 99 && <span className="notification">99+</span>}
                  {visibleChat.unread > 0 && visibleChat.unread < 100 && (
                    <span
                      className="notification"
                      style={{ width: "1.1rem", height: "1.1rem", "font-size": "0.7rem" }}
                    >
                      {visibleChat.unread}
                    </span>
                  )}
                </div>
                <div className="actions">
                  <svg
                    onClick={async (e) => {
                      e.stopPropagation();
                      await changeVisibleStatus(visibleChat.friend._id, false, navigate);
                      refreshVisibleChats();
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <title>Hide Chat</title>
                    <path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
                  </svg>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
}

DMs.propTypes = {
  visibleChats: PropTypes.array,
  refreshVisibleChats: PropTypes.func,
  selected: PropTypes.string,
};
