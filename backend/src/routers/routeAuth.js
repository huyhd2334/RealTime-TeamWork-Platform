import express from "express"
import {registerControler, loginController, refreshTokenControler} from "../controller/authControler.js"
const router = express.Router()

router.post("/login", loginController)
router.post("/signup", registerControler)
router.post("/refresh-accesstoken", refreshTokenControler)
// router.post("/logout", logoutAccount)

export default router