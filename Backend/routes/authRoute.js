const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  userController,
  addLikeProductController,
  unLikeProductController,
  editUserDetailsController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

// router object
const router = express.Router();

//routing
//REGISTER
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//forgot password
router.post("/forgot-password", forgotPasswordController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.post("/user-get", userController);

router.put("/add-like-product", requireSignIn, addLikeProductController);
router.put("/unlike-product", requireSignIn, unLikeProductController);
router.put("/user-update", requireSignIn, editUserDetailsController);

module.exports = router;
