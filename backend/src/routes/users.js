const { Router } = require("express");
const router = Router();

const {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
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
    .delete(deleteUser)
    .put(updateUser);

router
  .route("/players/action")
  .post(addFavouritePlayer)
  .delete(removeFavouritePlayer);

module.exports = router;
