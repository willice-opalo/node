import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/ideas", (req, res) => {
  const ideas = [
    { id: 1, title: "idea1", description: "this is idea 1" },
    { id: 2, title: "idea2", description: "this is idea 2" },
    { id: 3, title: "idea3", description: "this is idea 3" },
  ];
  res.json(ideas);
});

app.post("/api/ideas", (req, res) => {
  console.log(req.body);

  res.send("req.body");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
