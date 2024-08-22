const express = require("express");
const app = express();

require("dotenv").config();
require("./connections/Conn");

const cors = require("cors");
const userAPI = require("./routes/User");
const taskAPI= require("./routes/Task");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', userAPI);
app.use('/api/v2', taskAPI);

// Default Route
app.use("/", (req, res) => {
    res.send("Hello From Backend Side!");
});

// Start Server
const PORT = 2000;
app.listen(PORT, () => {
    console.log("Server Started!");
});
