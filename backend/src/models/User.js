const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favouritePlayers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.validPassword = function (password) {
  return this.password === password; // Comparar la contraseña proporcionada con la almacenada
};

module.exports = model("User", userSchema);
