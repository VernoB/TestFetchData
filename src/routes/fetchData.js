const { Router } = require("express");
const fetchData = require("../controller");

const router = Router();

router.get("/api", fetchData.fetch.fetchData);

module.exports = router;
