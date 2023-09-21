const { Router } = require("express");
const router = Router();

const {
  getPlayers,
  createPlayer,
  deletePlayer,
  updatePlayer,
  getPlayer,
} = require("../controllers/players.controllers");

//prettier-ignore
router
    .route("/")
    .get(getPlayers)
    .post(createPlayer)

//prettier-ignore
router
    .route("/:id")
    .get(getPlayer)
    .delete(deletePlayer)
    .put(updatePlayer);

module.exports = router;
