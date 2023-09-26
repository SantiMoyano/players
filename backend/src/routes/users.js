const { Router } = require("express");
const router = Router();

const {
  getUser,
  getUsers,
  createUser,
  deleteUser,
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

module.exports = router;
