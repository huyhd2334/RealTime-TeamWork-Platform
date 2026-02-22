import express from "express"
import {loginAccount,createAccount,logoutAccount, refreshToken} from "../controller/LogicAuth.js"
const router = express.Router()

router.post("/login", loginAccount)
router.post("/signup", createAccount)
router.post("/logout", logoutAccount)
router.post("/refresh-accesstoken", refreshToken)

export default router