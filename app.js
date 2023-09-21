const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();

const oneMinuteInMilliseconds = 120 * 1000;
const expirationDate = new Date(Date.now() + oneMinuteInMilliseconds);

app.use(
  cookieSession({
    name: "session",
    keys: ["arun"],
    expires: expirationDate, 
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen("5000", () => {
  console.log("Server is running!");
});