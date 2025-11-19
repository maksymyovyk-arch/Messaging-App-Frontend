import "./Settings.css";
import { useGetUser, useSetSelected } from "../../Utilities";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SettingsProfile() {
  useSetSelected("profile");

  const user = useGetUser();
  const [errors, setErrors] = useState({
    displayname: [],
    avatar: [],
    status: [],
    about: [],
  });
  const [success, setSuccess] = useState(false);
  const [remainingCharacters, setRemainingCharacters] = useState({
    status: 40,
    about: 190,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user)
      setRemainingCharacters({
        status: 40 - user.status.length,
        about: 190 - user.about.length,
      });
  }, [user]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setSuccess(false);

    let errors = await fetch(
      "https://kweebac-messagingapp-api.up.railway.app/api/user/profile",
      {
        method: "PUT",
        body: new FormData(e.target),
        credentials: "include",
      }
    );
    errors = await errors.json();

    if (errors) setErrors(errors);
    else {
      setErrors({
        displayname: [],
        avatar: [],
        status: [],
        about: [],
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  }

  if (user)
    return (
      <div className="options">
        <main>
          <h1>Profile</h1>
          <form onSubmit={(e) => handleFormSubmit(e)} encType="multipart/form-data">
            <div className="inputs">
              <div>
                <label className="title">
                  USERNAME
                  <div>
                    <input
                      type="text"
                      name="displayname"
                      defaultValue={user.displayname}
                      minLength={3}
                    />
                  </div>
                </label>
              </div>
              {errors.displayname.length > 0 && (
                <ul className="errors">
                  {errors.displayname.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
              <div>
                <label className="title">
                  AVATAR
                  <div>
                    <input type="file" accept=".png, .jpg, .jpeg" name="avatar" />
                  </div>
                </label>
              </div>
              {errors.avatar.length > 0 && (
                <ul className="errors">
                  {errors.avatar.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
              <hr />
              <div>
                <label className="title">
                  STATUS
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      name="status"
                      defaultValue={user.status}
                      maxLength={40}
                      onInput={(e) =>
                        setRemainingCharacters({
                          ...remainingCharacters,
                          status: 40 - e.target.value.length,
                        })
                      }
                    />
                    <div className="statusRemainingCharacters">
                      {remainingCharacters.status}
                    </div>
                  </div>
                </label>
              </div>
              {errors.status.length > 0 && (
                <ul className="errors">
                  {errors.status.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
              <div>
                <label className="title">
                  ABOUT ME
                  <div style={{ position: "relative" }}>
                    <textarea
                      name="about"
                      rows="10"
                      defaultValue={user.about}
                      maxLength={190}
                      onInput={(e) =>
                        setRemainingCharacters({
                          ...remainingCharacters,
                          about: 190 - e.target.value.length,
                        })
                      }
                    ></textarea>
                    <div className="aboutRemainingCharacters">{remainingCharacters.about}</div>
                  </div>
                </label>
              </div>
              {errors.about.length > 0 && (
                <ul className="errors">
                  {errors.about.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
              <hr />
              <div>
                <label className="title">
                  VISIBILITY
                  <div>
                    <select name="visibility" defaultValue={user.visibility}>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                      <option value="dnd">Do Not Disturb</option>
                    </select>
                  </div>
                </label>
              </div>
              <hr />
              <div className="saveChanges">
                <button className="save">Save Changes</button>
                {success ? (
                  <span>Success!</span>
                ) : (
                  <span style={{ visibility: "hidden" }}>Success!</span>
                )}
              </div>
            </div>
          </form>
          <div className="close">
            <svg
              onClick={() => navigate(-1)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>Close</title>
              <path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
            </svg>
            <div className="title">ESC</div>
          </div>
        </main>
      </div>
    );
}
