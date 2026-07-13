import { Router } from "express";
import Content from "../models/Content.js";

const router = Router();

router.get("/:section", async (req, res) => {
  try {
    const contents = await Content.find({ section: req.params.section });
    const map = {};
    for (const item of contents) {
      map[item.key] = { id: item._id, value: item.value, type: item.type, label: item.label };
    }
    res.json(map);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:section/:key", async (req, res) => {
  try {
    const item = await Content.findOne({ section: req.params.section, key: req.params.key });
    if (!item) return res.status(404).json({ message: "Content not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
