import { useState, useEffect, useContext } from "react";
import MyDataContext from "../data/MyDataContext";
function Login() {
  const { createUser, checkLogin } = useContext(MyDataContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatches, setPasswordMatches] = useState(false);

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
    if (!isLogin) createUser(data); // register user on database
    if (isLogin) checkLogin(data);
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
            {!passwordMatches && <span>La contraseña no coincide</span>}
          </div>
        )}
        <div className="button-submit">
          <button>{isLogin ? "INICIAR SESIÓN" : "CREAR CUENTA"}</button>
        </div>
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
