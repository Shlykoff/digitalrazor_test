import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/form/a", (req: Request, res: Response) => {
  console.log("Received data from form A:", req.body);
  const applicationId = Math.floor(1000 + Math.random() * 9000);
  const message = "Application for Form A processed";
  res.status(200).json({ applicationId, message });
});

app.post("/form/b", (req: Request, res: Response) => {
  console.log("Received data from form B:", req.body);
  const applicationId = Math.floor(1000 + Math.random() * 9000);
  const message = "Application for Form B processed";
  res.status(200).json({ applicationId, message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
