const { Router } = require("express");
const router = Router();

const {
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
    .delete(deleteUser);

module.exports = router;
