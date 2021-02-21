require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./DB/dbConnection");

// Server instance creation
const app = express();
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const loginRoutes = require("./Routes/loginRoutes");
// middlewares
app.use(express.json());
app.use(cors());

// All routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/loginhistory", loginRoutes);

app.use((errors, req, res, next) => {
  const status = errors.statusCode || 500;
  const message = errors.message;
  const data = errors.data;
  res.status(status).json({ success: false, errors: message, data: data });
});

let dirname = path.resolve();
app.use(express.static(path.join(dirname, "/client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(dirname, "client", "build", "index.html"))
);

// Asigning port to server
const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
