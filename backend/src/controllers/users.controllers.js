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
    const profileImageUrl =
      "data:image/jpeg;base64,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";

    const profileBio = `Welcome to ${username} profile!`;
    const profileBannerColor = "#7335BA";
    const newUser = new User({
      username,
      password,
      profileImageUrl,
      profileBio,
      profileBannerColor,
    });
    await newUser.save();
    res.json({ message: "Usuario creado" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

userCtrl.updateUser = async (req, res) => {
  const { username, profileImageUrl, profileBio, profileBannerColor } =
    req.body;
  await User.findByIdAndUpdate(req.params.id, {
    username,
    profileImageUrl,
    profileBio,
    profileBannerColor,
  });
  res.json({ message: "User Updated" });
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
    console.log(userId, playerId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.favouritePlayers.push(playerId);
    await user.save();

    res.json({ message: "Jugador favorito agregado al usuario" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el jugador favorito" });
  }
};

userCtrl.removeFavouritePlayer = async (req, res) => {
  try {
    const { userId, playerId } = req.body;
    console.log(userId, playerId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.favouritePlayers = user.favouritePlayers.filter(
      (favouritePlayer) => favouritePlayer.toString() !== playerId
    );

    await user.save();

    res.json({ message: "Jugador favorito eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar jugador favorito" });
  }
};

module.exports = userCtrl;
