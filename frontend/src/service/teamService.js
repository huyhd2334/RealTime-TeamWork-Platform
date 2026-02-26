import api from "@/lib/axios"

export const updateTeam = async({teamId, type, newMemberId, newTeamName, newDescription}) => {
    try {
        const res = await api.post("/team/update", {teamId, type, newMemberId, newTeamName, newDescription})
        return res.data.message
    } catch (error) {
        console.log(error)
    }
}

export const deleteTeam = async({teamId}) => {
   try {
      const res = await api.post("/team/delete", {teamId})
      return res
   } catch (error) {
     console.log(error)
   }
}

export const createTeam = async({teamName, description}) => {
   try {
       const res = await api.post("team/create", {teamName, description})
       return res
    } catch (error) {
       console.log(error)
   }
}

export const fetchTeam = async({mode}) => {
   try {
      const res = await api.post("/team/fetchteam", {mode})
      return res
   } catch (error) {
     console.log(error)
   }
}
