const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  await newUser.save();

  const token = await jwt.sign({ _id: newUser.id }, "secretkey");

  res.send({ token });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });

  if (!userFound) {
    return res.sendStatus(401);
  }

  if (userFound.password != password) {
    return res.sendStatus(401);
  }

  const token = await jwt.sign({ _id: userFound._id }, "secretkey");

  res.status(200).json({ token });
});

router.get("/", (req, res) => {
  res.send("hello");
});

router.get("/tasks", (req, res) => {
  res.json({
    prueba: "hola",
  });
});

router.get("/private", verifyToken, (req, res) => {
  res.json({ private: "private" });
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.sendStatus(401);
  }
  const cabecera = req.headers.authorization;
  const token = cabecera.split(" ")[1];
  try {
    const payload = jwt.verify(token, "secretkey");
    req.UserId = payload._id;
    console.log(payload);
    next();
  } catch (err) {
    res.status(401).json({ message: err });
  }
}

module.exports = router;
