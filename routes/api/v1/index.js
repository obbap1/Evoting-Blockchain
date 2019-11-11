const express = require("express");

const router = express.Router();

const AuthRouter = require("./auth");
// const ProductRouter = require("./product");

router.use("/auth", AuthRouter);
// router.use("/product", usersRouter);

router.get("/", (req, res) => res.send({ message: "Block chain" }));

router.use((req, res) => res.send({ message: "Unallocated Endpoint!" }));

module.exports = router;
