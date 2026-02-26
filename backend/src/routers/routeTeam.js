import express from "express"
import {createTeam, deleteTeam, updateTeam, fetchTeam} from "../controller/LogicTeamCRUD.js"

const Team = express.Router()

Team.post("/create", createTeam)
Team.post("/delete", deleteTeam)
Team.post("/update", updateTeam)
Team.post("/fetchteam", fetchTeam)

export default Team