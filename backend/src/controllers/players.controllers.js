const playerCtrl = {};

const Player = require("../models/Player");

playerCtrl.getPlayer = async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.json(player);
};

playerCtrl.getPlayers = async (req, res) => {
  const players = await Player.find();
  res.json(players);
};

playerCtrl.createPlayer = async (req, res) => {
  const { name, score, trophies, description, tags } = req.body;
  const newPlayer = new Player({ name, score, trophies, description, tags });

  await newPlayer.save();
  res.json({ message: "Player created!" });
  console.log("Jugador creado");
};

playerCtrl.deletePlayer = async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.json({ message: "Player Deleted" });
};

playerCtrl.updatePlayer = async (req, res) => {
  const { name, score, trophies, description, tags } = req.body;
  await Player.findByIdAndUpdate(req.params.id, {
    name,
    score,
    trophies,
    description,
    tags,
  });
  res.json({ message: "Player Updated" });
};

module.exports = playerCtrl;
