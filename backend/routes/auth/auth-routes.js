const express =require('express');


const router = express.Router();
const { registerUser } = require("../../controllers/auth/auth-controller");
const { loginUser } = require("../../controllers/auth/auth-controller");
const { logoutUser } = require("../../controllers/auth/auth-controller");
const { authMiddleware } = require("../../controllers/auth/auth-controller");





router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user; // Access the authenticated user from the request
    res.status(200).json({
        success: true,
        message: "User is authenticated",
        user,
     });
});

module.exports = router;