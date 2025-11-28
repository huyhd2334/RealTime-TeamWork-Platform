import express from "express"
import {loginAccount,createAccount,logout} from "../controller/LogicAuth.js"
const router = express.Router()

router.post("/login", loginAccount)
router.post("/signup", createAccount)
router.post("/logout", logout)

export default router