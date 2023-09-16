const tagCtrl = {};

const Tag = require("../models/Tag");

tagCtrl.getTag = async (req, res) => {
  const tag = await Tag.findById(req.params.id);
  res.json(tag);
};

tagCtrl.getTags = async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
};

tagCtrl.createTag = async (req, res) => {
  const { tagName, tagColor, tagType } = req.body;
  const newTag = new Tag({ tagName, tagColor, tagType });

  await newTag.save();
  res.json({ message: "Tag created!" });
};

tagCtrl.deleteTag = async (req, res) => {
  await Tag.findByIdAndDelete(req.params.id);
  res.json({ message: "Tag Deleted" });
};

tagCtrl.updateTag = async (req, res) => {
  const { tagName, tagColor, tagType } = req.body;
  await Tag.findByIdAndUpdate(req.params.id, { tagName, tagColor, tagType });
  res.json({ message: "Tag Updated" });
};

module.exports = tagCtrl;
