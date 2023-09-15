const tagCtrl = {};

const Tag = require("../models/Tag");

tagCtrl.getTags = async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
};

tagCtrl.createTag = async (req, res) => {
  console.log(req.body);
  const { tagName, tagColor, tagType } = req.body;
  const newTag = new Tag({ tagName, tagColor, tagType });

  await newTag.save();
  res.json({ message: "Tag created!" });
};

tagCtrl.deleteTag = async (req, res) => {
  await Tag.findByIdAndDelete(req.params.id);
  res.json({ message: "Tag Deleted" });
};

module.exports = tagCtrl;
