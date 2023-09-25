import { useState } from "react";
function Login() {
  const [isLogin, setIsLogin] = useState("false");
  function handleClick() {
    setIsLogin(!isLogin);
  }
  return (
    <section className="login">
      <h2>{isLogin ? "LOGIN" : "REGISTER"}</h2>
      <form>
        <div>
          <label htmlFor="name">Ingrese su usuario:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="password">Ingrese su contraseña:</label>
          <input type="password" id="name" name="name" />
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="password">Reingrese su contraseña:</label>
            <input type="password" id="name" name="name" />
          </div>
        )}
        <div className="button-submit">
          <button>submit</button>
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
