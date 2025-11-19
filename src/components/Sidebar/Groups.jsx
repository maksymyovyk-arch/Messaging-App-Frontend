import "./Sidebar.css";

export default function Groups() {
  return (
    <div className="DM">
      <h1>
        <span className="title">GROUPS</span>
        <svg className="plusButton" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Create Group</title>
          <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
      </h1>
      <ul className="chats">
        <li className="chat">
          <div>
            <img
              src="https://img.freepik.com/free-photo/textured-background-white-tone_53876-128610.jpg"
              // alt={}
            />
            <div className="info">
              <div>Friend group</div>
              <div>6 members</div>
            </div>
            {/* {visibleChat.unread > 99 && <span className="notification">99+</span>}
            {visibleChat.unread > 0 && visibleChat.unread < 100 && (
              <span
                className="notification"
                style={{ width: "1.1rem", height: "1.1rem", "font-size": "0.7rem" }}
              >
                {visibleChat.unread}
              </span>
            )} */}
          </div>
          <div className="actions">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Hide Chat</title>
              <path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
            </svg>
          </div>
        </li>{" "}
      </ul>
    </div>
  );
}
