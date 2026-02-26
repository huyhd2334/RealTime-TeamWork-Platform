import Teams from "../models/Teams.js"
import Account from "../models/Account.js";

export const createTeam = async(req, res) => {
    try {
        const {teamName, description} = req.body
        const team = await Teams.create({teamName, description,
                             createBy: req.user_id,
                             members: [{user: req.user_id},
                                       {role: "leader"}]
        })
        console.log(`Create ${teamName} successfully`)
        return res.status(200).json({success: true, message: `Create ${teamName} successfully`, res: team})
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, message: `Create ${teamName} successfully`})
    }
}

export const deleteTeam = async(req, res) => {
    try {
        const {teamId} = req.body
        const team = await Teams.findById(teamId)
        if(!team){
            return res.status(500).json({success: false, message: `Team not found!`})
        }else{
            const teamName = team.teamName
            if(team.createBy === req.user_id){
                await Teams.findByIdAndDelete(teamId)
                return res.status(500).json({success: true, message: `Team ${teamName} has been deleted`})
            }else{return res.status(500).json({success: false, message: `You do not have permision to delete it!`})}
        }
    } catch (error) {
        console.log(eror)
        return res.status(500).json({success: false, message: `catch error when call delete Team`})
    }
}

export const updateTeam = async(req, res) => {
    // team id, type, (new member (newMemberId)), (change name + description) 
    try {
        const {teamId, type} = req.body 
        const team = await Teams.findById(teamId) 
        if(!team){return res.status(500).json({success: false, message: `Team not found!`})}

        if(type === "addmember"){
           const {memberId} = req.body
           const member = await Account.findById(memberId)
           if(!member){return res.status(500).json({success: false, message: `Member not found!`})}
           await Teams.findByIdAndUpdate(teamId, {$push: {members: {user: memberId}}})
        }else if(type === "changename"){
           const {newName} = req.body
           await Teams.findByIdAndUpdate(teamId, {teamName: newName})
        }else if(type === "changedescription"){
           const {newDescription} = req.body
           await Teams.findByIdAndUpdate(teamId, {description: newDescription})
        }else if(type === "kickmember"){
           const {memberId} = req.body
           const member = await Account.findById(memberId)
           if(!member){return res.status(500).json({success: false, message: `Member not found!`})}
           await Teams.findByIdAndUpdate(teamId, {$pull: {members: {user: memberId}}})
        }
        return res.status(202).json({success: true, message: "Team has been updated"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: `Update Team fail`})
    }
}

export const fetchTeam = async(req, res) => {
    try {
        const mode = req.body
        let teams
        if(mode === "own"){
            teams = await Teams.find({"member.user": req.user_id})
        }else if(mode === "all")
            teams = await Teams.find()
        return res.status(200).json({success: true, message: `Got Teams`, res: teams})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: `Got Teams fail`})  
    }
}