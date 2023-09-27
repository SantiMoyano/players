const { Router } = require("express");
const router = Router();

const { checkLogin } = require("../controllers/login.controllers");

//prettier-ignore
router
    .route("/")
    .post(checkLogin)

module.exports = router;
