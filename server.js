const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser"); // Not strictly needed if using express.json() for JSON bodies
const path = require("path"); // <--- ADD THIS LINE

const loginRoutes = require("./routes/login");
const registerRoute = require("./routes/register");
const dashboardRoutes = require("./routes/dashboard");
const LaborRoutes = require("./routes/Labor");
const purchase = require("./routes/purchase");
const Inventory = require("./routes/Inventory");
const clockIn = require("./routes/clock-in");
const clockOut = require("./routes/clock-out");
const expense = require("./routes/expense"); // This is your expense routes file
const LabourAttendanceRoute = require("./routes/labourAttendace.route");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Replaces bodyParser.json() for JSON parsing

// Serve static files from the 'uploads' directory
// This makes files uploaded by Multer accessible via a URL
// e.g., http://localhost:PORT/uploads/your-filename.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // <--- ADD THIS LINE

// MongoDb Connection using .env for the BuildTrack App
const url = process.env.MONGO_URI; // Ensure this variable is correctly set in your .env file

// Routes
app.use("/register", registerRoute);
app.use("/login", loginRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/labor", LaborRoutes);
app.use("/procurement", purchase);
app.use("/api/inventory", Inventory);
app.use("/clock-in", clockIn);
app.use("/clock-out", clockOut);
app.use("/expenses", expense); // Your expense routes
app.use("/api/labour-attendance", LabourAttendanceRoute);

// Basic root route
app.get('/', (req, res) => {
  res.send('BuildTrack API is running.');
});

// Connect to DB and Start Server at Mongo Db Cluster
mongoose
  .connect(url)
  .then(() => {
    const PORT = process.env.PORT || 5000; // Use a default port if not in .env
    app.listen(PORT, async () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Connected to ConstructionSite database");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });