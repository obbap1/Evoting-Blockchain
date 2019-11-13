const express = require("express");

const router = express.Router();

const AuthRouter = require("./auth");
const CandidateRouter = require("./candidate");
const AdminRouter = require("./admin");
const VoterRouter = require("./voter");
const ElectionRouter = require("./election");

router.use("/auth", AuthRouter);
router.use("/candidate", CandidateRouter);
router.use("/admin", AdminRouter);
router.use("/voter", VoterRouter);
router.use("/election", ElectionRouter);

router.get("/", (req, res) => res.send({ message: "Block chain" }));

router.use((req, res) => res.send({ message: "Unallocated Endpoint!" }));

module.exports = router;
