import defaultAvatar from "../../assets/defaultAvatars/user.jpg";
import PropTypes from "prop-types";
import "./Avatar.css";

export default function UserAvatar({ user }) {
  return (
    <div className="avatarImage">
      <img
        src={user.avatar ? user.avatar : defaultAvatar}
        alt={`${user.displayname}'s profile picture`}
      />
      <div className={user.visibility}></div>
    </div>
  );
}

UserAvatar.propTypes = {
  user: PropTypes.object,
};
