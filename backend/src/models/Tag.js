const { Schema, model } = require("mongoose");

const tagSchema = new Schema(
  {
    tagName: {
      type: String,
    },
    tagColor: {
      type: String,
    },
    tagType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Tag", tagSchema);
