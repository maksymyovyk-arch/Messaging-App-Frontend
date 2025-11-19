import defaultAvatar from "../../assets/defaultAvatars/group.jpg";
import PropTypes from "prop-types";
import "./Avatar.css";

export default function GroupAvatar({ group }) {
  return (
    <div className="avatarImage">
      <img
        src={group.avatar ? group.avatar : defaultAvatar}
        alt={`${group.name}'s profile picture`}
      />
    </div>
  );
}

GroupAvatar.propTypes = {
  user: PropTypes.object,
};
