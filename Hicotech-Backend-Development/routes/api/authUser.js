const router = require("express").Router();
const { register, login, logout } = require("../../controllers/authControllerUser");
router.post("/user/register", register);
router.post("/user/login", login);
router.get("/user/logout", logout);
module.exports = router;
