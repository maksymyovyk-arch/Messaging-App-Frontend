import UserAvatar from "../Avatar/UserAvatar";
import "./Chat.css";
import PropTypes from "prop-types";

export default function UserInfo({ user }) {
  return (
    <aside>
      <UserAvatar user={user} />
      <section className="info">
        <h1 className="title username">{user.displayname}</h1>
        <p>{user.status}</p>
        {user.about && (
          <>
            <hr />
            <h1 className="title about">ABOUT ME</h1>
            <p>{user.about}</p>
          </>
        )}
      </section>
    </aside>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object,
};
