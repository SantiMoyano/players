const express = require("express");
const cors = require("cors");

const app = express();

// settings
app.set("port", process.env.PORT || 4000);

// cors middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/login", require("./routes/login"));
app.use("/api/users", require("./routes/users"));
app.use("/api/tags", require("./routes/tags"));
app.use("/api/players", require("./routes/players"));

module.exports = app;
