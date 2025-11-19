import "./Settings.css";
import { useIsAuthenticated, useSetSelected } from "../../Utilities";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function SettingsAccount() {
  useSetSelected("account");

  const [errors, setErrors] = useState({
    currentPassword: [],
    email: [],
    password: [],
  });
  const [success, setSuccess] = useState(false);
  const currentPasswordInputRef = useRef();
  const navigate = useNavigate();
  useIsAuthenticated();

  async function handleFormSubmit(e) {
    e.preventDefault();
    setSuccess(false);

    let errors = await fetch(
      "https://kweebac-messagingapp-api.up.railway.app/api/user/account",
      {
        method: "PUT",
        body: new URLSearchParams(new FormData(e.target)),
        credentials: "include",
      }
    );
    errors = await errors.json();

    if (errors) setErrors(errors);
    else {
      setErrors({
        currentPassword: [],
        email: [],
        password: [],
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  }

  async function handleDeleteAccount() {
    if (!currentPasswordInputRef.current.value) {
      return setErrors({
        currentPassword: ["Does not match"],
        email: [],
        password: [],
      });
    }

    let errors = await fetch("https://kweebac-messagingapp-api.up.railway.app/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword: currentPasswordInputRef.current.value }),
      credentials: "include",
    });
    errors = await errors.json();

    if (errors === false) navigate("/auth");
    else setErrors(errors);
  }

  return (
    <div className="options">
      <main>
        <h1>Account</h1>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div className="inputs">
            <div className="required">
              <label>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Required</title>
                    <path d="M10 3H14V14H10V3M10 21V17H14V21H10Z" />
                  </svg>
                  <span className="title">CURRENT PASSWORD</span>
                </div>
                <div>
                  <input
                    type="password"
                    name="currentPassword"
                    required
                    minLength={8}
                    ref={currentPasswordInputRef}
                  />
                </div>
              </label>
            </div>
            {errors.currentPassword.length > 0 && (
              <ul className="errors">
                {errors.currentPassword.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
            <div>
              <label className="title">
                EMAIL
                <div>
                  <input type="email" name="email" />
                </div>
              </label>
            </div>
            {errors.email.length > 0 && (
              <ul className="errors">
                {errors.email.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
            <div>
              <label className="title">
                PASSWORD
                <div>
                  <input type="password" name="password" minLength={8} />
                </div>
              </label>
            </div>
            {errors.password.length > 0 && (
              <ul className="errors">
                {errors.password.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
            <hr />
            <button className="delete" type="button" onClick={handleDeleteAccount}>
              Delete Account
            </button>
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
