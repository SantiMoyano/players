import { useState, useEffect, useContext } from "react";
import MyDataContext from "../data/MyDataContext";
function Login() {
  const { createUser, checkLogin } = useContext(MyDataContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatches, setPasswordMatches] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  function handleClick() {
    setIsLogin(!isLogin);
  }

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  useEffect(() => {
    setPasswordMatches(password === confirmPassword);
  }, [password, confirmPassword]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await { username, password };
    // register user on database
    if (!isLogin) {
      createUser(data);
      changeMessage("Te registraste con exito!", "green");
      setIsLogin(!isLogin);
    }
    // login user on database
    if (isLogin) {
      checkLogin(data);
      changeMessage("Te logueaste con exito!", "green");
    }
  }

  function changeMessage(message, color) {
    setMessage(message);
    setMessageColor(color);
    setTimeout(() => {
      setMessage("");
      setMessageColor("");
    }, 3000);
  }

  return (
    <section className="form-section">
      <h2>{isLogin ? "LOGIN" : "REGISTER"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Ingrese su usuario:</label>
          <input type="text" id="name" name="name" onChange={handleUsername} />
        </div>
        <div>
          <label htmlFor="password">Ingrese su contraseña:</label>
          <input
            type="password"
            id="password"
            name="name"
            onChange={handlePassword}
          />
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="password">Reingrese su contraseña:</label>

            <input
              type="password"
              id="confirmPassword"
              name="name"
              onChange={handleConfirmPassword}
            />
            {!passwordMatches && (
              <span style={{ color: "red", paddingTop: "8px" }}>
                Las contraseñas no coinciden
              </span>
            )}
          </div>
        )}
        <div className="button-submit">
          <button>{isLogin ? "INICIAR SESIÓN" : "CREAR CUENTA"}</button>
        </div>
        <span style={{ color: messageColor }}>{message}</span>
        <div className="auth-switch">
          <span>
            {isLogin ? "No tenes una cuenta aun?" : "Ya tenes una cuenta?"}
          </span>
          <span id="auth-span" onClick={handleClick}>
            <u>{isLogin ? "Registrarse" : "Loguearse"}</u>
          </span>
        </div>
      </form>
    </section>
  );
}

export default Login;
