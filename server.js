const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { connection } = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/post");
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);
connection();
app.listen(PORT, () => {
  console.log(`App is listenig on the PORT ${PORT}`);
});
