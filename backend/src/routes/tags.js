const { Router } = require("express");
const router = Router();

const {
  getTags,
  createTag,
  deleteTag,
} = require("../controllers/tags.controllers");

//prettier-ignore
router
    .route("/")
    .get(getTags)
    .post(createTag)

//prettier-ignore
router
    .route("/:id")
    .delete(deleteTag);

module.exports = router;
