const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const path = require("path");

const Project = require("./models/Project"); // Make sure you have this
const Plot = require("./models/Plots");
const Resell = require("./models/Resell");
const { default: Resell } = require("../front/src/components/Resell");

const app = express();

// Middleware
// app.use(cors());----OLD
// import cors from "cors";
// app.use(cors({
//   origin: "https://your-netlify-site.netlify.app"
// }));

// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://your-frontend.netlify.app", // Netlify frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Admin Login Route
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

/* ==================== PROJECT ROUTES ===================== */

// POST: Add a Project
app.post(
  "/admin/project",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "brochure", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, type, possession, status, location } = req.body;
      const image = req.files?.image?.[0];
      const brochure = req.files?.brochure?.[0];

      const newProject = new Project({
        name,
        type,
        possession,
        status,
        location,
        imageUrl: image ? `/uploads/${image.filename}` : null,
        brochureUrl: brochure ? `/uploads/${brochure.filename}` : null,
      });

      await newProject.save();
      res.status(201).json({ message: "Project saved", project: newProject });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

// GET: All Projects
app.get("/admin/project", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});




/* ==================== PLOT ROUTES ===================== */

// POST: Add a Plot
app.post(
  "/admin/plot",
  upload.fields([{ name: "image", maxCount: 1 }]),
  async (req, res) => {
    console.log("✅ POST /admin/plot hit");
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    try {
      const { area, type, price, location } = req.body;
      const image = req.files?.image?.[0];

      const newPlot = new Plot({
        area,
        type,
        price,
        location,
        imageUrl: image ? `/uploads/${image.filename}` : null,
      });

      await newPlot.save();
      res.status(201).json({ message: "Plot saved", plot: newPlot });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

// GET: All Plots
app.get("/admin/plot", async (req, res) => {
  try {
    const plots = await Plot.find();
    res.status(200).json(plots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch plots" });
  }
});

// GET: Filtered Projects by Type (e.g., Commercial)
app.get("/admin/plots/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const projects = await Project.find({ type }); // Filter by type
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch projects by type" });
  }
});

/* ==================== RESELL ROUTES ===================== */

// POST: Add a Resell
app.post(
  "/admin/resell",
  upload.fields([{ name: "image", maxCount: 1 }]),
  async (req, res) => {
    console.log("✅ POST /admin/plot hit");
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    try {
      const { area, type, price, location } = req.body;
      const image = req.files?.image?.[0];

      const newResell = new Resell({
        area,
        type,
        price,
        location,
        imageUrl: image ? `/uploads/${image.filename}` : null,
      });

      await newPlot.save();
      res.status(201).json({ message: "Resell saved", resell: newResell });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);


// GET: All Resell
app.get("/admin/resell", async (req, res) => {
  try {
    const resell = await Resell.find();
    res.status(200).json(resell);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch Resell" });
  }
});

// GET: Filtered Projects by Type (e.g., Commercial)
app.get("/admin/resell/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const resell = await Resell.find({ type }); // Filter by type
    res.status(200).json(resell);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch resell by type" });
  }
});


/* ==================== START SERVER ===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
