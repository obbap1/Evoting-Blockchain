const express = require("express");

const router = express.Router();

const AuthRouter = require("./auth");
const ProfileRouter = require("./profile");

router.use("/auth", AuthRouter);
router.use("/profile", ProfileRouter);

router.get("/", (req, res) => res.send({ message: "Block chain" }));

router.use((req, res) => res.send({ message: "Unallocated Endpoint!" }));

module.exports = router;
