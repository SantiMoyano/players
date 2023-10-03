const { Schema, model } = require("mongoose");

const playerSchema = new Schema(
  {
    name: {
      type: String,
    },
    score: {
      type: Number,
    },
    trophies: {
      type: Number,
    },
    shortDescription: {
      type: String,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    gifUrl: {
      type: String,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag", // Nombre del modelo al que se refiere
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Player", playerSchema);
