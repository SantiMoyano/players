const loginCtrl = {};

const User = require("../models/User");
const jwt = require("jsonwebtoken");

loginCtrl.checkLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Comprueba si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
    if (!user.validPassword(password)) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "mynewsecret",
      { expiresIn: "1h" }
    );

    // Devuelve una respuesta de éxito si las credenciales son válidas
    return res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante el proceso
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = loginCtrl;
