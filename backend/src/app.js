const express = require("express");
const cors = require("cors");
const passport = require("passport");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const passportConfig = require("./auth/passport");

const app = express();

// settings
app.set("port", process.env.PORT || 4000);

// cors middleware
app.use(cors());
app.use(express.json());

// passport middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: "tu_secreto",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/users", require("./routes/users"));
app.use("/api/tags", require("./routes/tags"));
app.use("/api/players", require("./routes/players"));

module.exports = app;
