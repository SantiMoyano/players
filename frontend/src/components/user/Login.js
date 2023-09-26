import { useState, useEffect } from "react";
function Login() {
  const [isLogin, setIsLogin] = useState("false");
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

  function handleSubmit(e) {
    e.preventDefault();
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
            id="name"
            name="name"
            onChange={handlePassword}
          />
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="password">Reingrese su contraseña:</label>

            <input
              type="password"
              id="name"
              name="name"
              onChange={handleConfirmPassword}
            />
            {!passwordMatches && <span>La contraseña no coincide</span>}
          </div>
        )}
        <div className="button-submit">
          <button>Enviar</button>
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
