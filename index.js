import express from "express";
import dotenv from "dotenv";
import searchRoutes from "./routes/search.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/search", searchRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Node Google Search API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
