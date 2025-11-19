import "./Auth.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsNotAuthenticated } from "../../Utilities";

export default function Auth() {
  const [registerErrors, setRegisterErrors] = useState({
    email: [],
    password: [],
    displayname: [],
  });
  const [loginErrors, setLoginErrors] = useState({
    email: [],
    password: [],
  });
  const loginEmailInputRef = useRef();
  const navigate = useNavigate();
  useIsNotAuthenticated();

  async function handleRegister(e) {
    e.preventDefault();

    let res = await fetch(
      "https://kweebac-messagingapp-api.up.railway.app/api/auth/register",
      {
        method: "POST",
        body: new URLSearchParams(new FormData(e.target)),
      }
    );
    res = await res.json();

    if (res === true) {
      setRegisterErrors({
        email: [],
        password: [],
        displayname: [],
      });
      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
      loginEmailInputRef.current.focus();
    } else setRegisterErrors(res);
  }

  async function handleLogin(e) {
    e.preventDefault();

    let res = await fetch("https://kweebac-messagingapp-api.up.railway.app/api/auth/login", {
      method: "POST",
      body: new URLSearchParams(new FormData(e.target)),
      credentials: "include",
    });
    res = await res.json();

    if (res === true) navigate("/");
    else setLoginErrors(res);
  }

  return (
    <div className="auth">
      <main>
        <section className="register">
          <form onSubmit={(e) => handleRegister(e)}>
            <h1>Register</h1>
            <div className="inputs">
              <div className="required">
                <label>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <title>Required</title>
                      <path d="M10 3H14V14H10V3M10 21V17H14V21H10Z" />
                    </svg>
                    <span className="title">EMAIL</span>
                  </div>
                  <div>
                    <input type="email" name="email" required />
                  </div>
                </label>
              </div>
              {registerErrors.email.length > 0 && (
                <ul className="errors">
                  {registerErrors.email.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
              <div className="required">
                <label>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <title>Required</title>
                      <path d="M10 3H14V14H10V3M10 21V17H14V21H10Z" />
                    </svg>
                    <span className="title">PASSWORD</span>
                  </div>
                  <div>
                    <input type="password" name="password" required minLength={8} />
                  </div>
                </label>
              </div>
              {registerErrors.password.length > 0 && (
                <ul className="errors">
                  {registerErrors.password.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
              <div className="required">
                <label>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <title>Required</title>
                      <path d="M10 3H14V14H10V3M10 21V17H14V21H10Z" />
                    </svg>
                    <span className="title">USERNAME</span>
                  </div>
                  <div>
                    <input type="text" name="displayname" required minLength={3} />
                  </div>
                </label>
              </div>
              {registerErrors.displayname.length > 0 && (
                <ul className="errors">
                  {registerErrors.displayname.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
            <button>Register</button>
          </form>
        </section>
        <section className="login">
          <form onSubmit={(e) => handleLogin(e)}>
            <h1>Login</h1>
            <div className="inputs">
              <div className="required">
                <label>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <title>Required</title>
                      <path d="M10 3H14V14H10V3M10 21V17H14V21H10Z" />
                    </svg>
                    <span className="title">EMAIL</span>
                  </div>
                  <div>
                    <input type="email" name="email" required ref={loginEmailInputRef} />
                  </div>
                </label>
              </div>
              {loginErrors.email.length > 0 && (
                <ul className="errors">
                  {loginErrors.email.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
              <div className="required">
                <label>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <title>Required</title>
                      <path d="M10 3H14V14H10V3M10 21V17H14V21H10Z" />
                    </svg>
                    <span className="title">PASSWORD</span>
                  </div>
                  <div>
                    <input type="password" name="password" required minLength={8} />
                  </div>
                </label>
              </div>
              {loginErrors.password.length > 0 && (
                <ul className="errors">
                  {loginErrors.password.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
            <button>Login</button>
          </form>
        </section>
      </main>
    </div>
  );
}
