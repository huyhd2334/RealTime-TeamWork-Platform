import bcrypt from "bcrypt"
import Account from "../models/Account.js";
import jwt from "jsonwebtoken"
import crypto from "crypto"
import Session from "../models/Session.js"

const ACCESS_TOKEN_TTL = '30m'
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 100 // 14 DAYS

export const createAccount = async(req,res) => {
    try{
        const {userName, accountName, passW} = req.body
        
        const checkExisUser = await Account.findOne({accountName})
        
        console.log(userName, accountName, passW)
        if(!checkExisUser){

            // hashpasw
            const hashPassW = await bcrypt.hash(passW, 10)
            
            const account = new Account({userName: userName, accountName: accountName, hashPassW: hashPassW, lastLogin: Date.now()})
            await account.save()
            res.status(200).json({message: true})
            console.log("add new user", userName, accountName, passW)
        }else{
            console.log("Account Name invalid!")
            return res.status(202).json({message: false, detail:"Account Name invalid!"})
        }
    }catch(error){
        console.error(error)
        return res.status(500).json({ message: false, error: "Internal server error" })
    }
}
export const loginAccount = async (req, res) => {
    try {
        const {accountName, passW, device} = req.body;
        if(!accountName || !passW) {
            return res.json({ message: false });
        }
        const checkAccountName = await Account.findOne({ accountName });
        if (!checkAccountName){
            return res.json({ message: false });
        }
        // check
        const isPasswCorrect = await bcrypt.compare(passW, checkAccountName.hashPassW)
        if(!isPasswCorrect){
            console.log("passW and hash not correct!")
            return res.json({ message: false })
        }
        // access token
        const accessToken = jwt.sign({user_id: checkAccountName._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_TTL})
        
        // generate refresh token
        const refreshToken = crypto.randomBytes(64).toString("hex")
        
        // generate new session to save refresh token
        await Session.create({userId: checkAccountName._id, refreshToken, expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),})
        
        // set cookies
        if(device==="web"){
            res
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 30 * 60 * 1000,
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: REFRESH_TOKEN_TTL,
            })
            .status(200)
            .json({
                message: true,
                detail: `User ${checkAccountName.userName} logged in!`,
            });
        }else{
            res.status(200).json({
            message: true,
            accessToken,
            refreshToken,
            detail: `User ${checkAccountName.userName} logged in!`,
            });
        }
    } catch (error) {
        console.error("ERROR login:", error);
        return res.status(500).json({ message: false, error: "Internal server error" });
    }
};

export const logoutAccount = async(req, res) => {
    try {
        // get refresh token from cookie
        const token = req.cookies?.refreshToken;
        if(token){
        // delete refresh token in session
           await Session.deleteOne({refreshToken: token});
        // delete cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        }

        return res.sendStatus(204)
    }catch(e){
        console.error("error when signout", e)
        return res.status(500).json({message: "internal errors"})
    }
}

export const refreshToken = async (req, res) => {
  try {
    let refreshToken;

    // Web → cookie
    if (req.cookies?.refreshToken) {
      refreshToken = req.cookies.refreshToken;
    } 
    // Mobile → body
    else if (req.body?.refreshToken) {
      refreshToken = req.body.refreshToken;
    }

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const session = await Session.findOne({ refreshToken });
    if (!session || session.expiresAt < new Date()) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { user_id: session.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    // Web → cookie
    if (req.cookies?.refreshToken) {
      return res
        .cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: ACCESS_TOKEN_TTL,
        })
        .json({ message: true });
    }

    // Mobile → trả JSON
    return res.json({ message: true, accessToken: newAccessToken });

  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(500).json({ message: false });
  }
};


