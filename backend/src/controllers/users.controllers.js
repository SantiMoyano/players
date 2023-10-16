const User = require("../models/User");

const userCtrl = {};

// Obtener un usuario por su ID
userCtrl.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

// Obtener todos los usuarios
userCtrl.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// Crear un nuevo usuario
userCtrl.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: "Usuario creado" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

// Eliminar un usuario por su ID
userCtrl.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};

userCtrl.addFavouritePlayer = async (req, res) => {
  try {
    const { userId, playerId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.favoritePlayers = [...user.favoritePlayers, playerId];
    await user.save();

    res.json({ message: "Jugador favorito agregado al usuario" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el jugador favorito" });
  }
};

module.exports = userCtrl;
