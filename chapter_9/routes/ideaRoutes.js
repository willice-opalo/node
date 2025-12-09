import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const ideas = [
    { id: 1, title: "idea1", description: "this is idea 1" },
    { id: 2, title: "idea2", description: "this is idea 2" },
    { id: 3, title: "idea3", description: "this is idea 3" },
  ];
  res.json(ideas);
});

router.post("/", (req, res) => {
  const { title, description } = req.body;
  console.log(description);
  //   res.send(`Title: ${title}, Description: ${description}`);
  res.json({ title, description });
});

export default router;
