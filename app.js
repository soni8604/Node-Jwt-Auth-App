const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middlewares/authMiddleware");
const { checkPrime } = require("crypto");
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// database connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/node-auth");
  console.log("Mongoose Connected");
}

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => {
  res.render("smoothies");
});
app.use(authRoutes);

app.listen(3001, () => {
  console.log("server up at 3000");
});
