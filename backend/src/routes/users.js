const { Router } = require("express");
const router = Router();

const {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  addFavouritePlayer,
  removeFavouritePlayer,
} = require("../controllers/users.controllers");

//prettier-ignore
router
    .route("/")
    .get(getUsers)
    .post(createUser)

//prettier-ignore
router
    .route("/:id")
    .get(getUser)
    .delete(deleteUser);

router
  .route("/players/action")
  .post(addFavouritePlayer)
  .delete(removeFavouritePlayer);

module.exports = router;
