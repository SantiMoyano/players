const { Router } = require("express");
const router = Router();

const {
  getTags,
  createTag,
  deleteTag,
  updateTag,
  getTag,
} = require("../controllers/tags.controllers");

//prettier-ignore
router
    .route("/")
    .get(getTags)
    .post(createTag)

//prettier-ignore
router
    .route("/:id")
    .get(getTag)
    .delete(deleteTag)
    .put(updateTag);

module.exports = router;
