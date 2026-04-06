export const createWorkSpace = async(client, {workspace_name, owner_id, description}) => {
    const query = `INSERT INTO workspace (workspace_name, owner_id, description)
                    VALUES ($1, $2, $3)
                    RETURNING *`
    const values = [workspace_name, owner_id, description]
        
    console.log('Executing query:', query)
    console.log('With values:', values)
        
    const result = await client.query(query, values)
    console.log('Query result:', result.rows[0])    
    return result.rows[0]
}

export const deleteWorkSpace = async(client, {workspace_id, owner_id}) => {
    const result = await client.query(`DELETE FROM workspace 
                                     WHERE workspace_id = $1 AND owner_id = $2
                                     RETURNING *`, [workspace_id, owner_id])
    return result.rows[0]
}

export const findByWorkSpaceId = async(client, workspace_id) => {
    const result = await client.query(`SELECT * FROM workspace WHERE workspace_id=$1`, [workspace_id])
    return result.rows[0]
}


export const findByWorkSpaceName = async(client, workspace_name) => {
    const result = await client.query(`SELECT * FROM workspace WHERE workspace_name=$1 `, [workspace_name])
    return result.rows
}


export const addMemberWorkSpace = async (client, { workspace_id, user_id, role }) => {
    const query = `INSERT INTO workspacemembers (workspace_id, user_id, role)
                   VALUES ($1, $2, $3)`

    const values = [workspace_id, user_id, role]
    const result = await client.query(query, values)
    return result.rows[0]
}

export const findWorkSpaceByUserId = async (client, user_id) => {
  const result = await client.query(
    `SELECT DISTINCT ON (m.workspace_id) 
        m.workspace_id,
        w.workspace_name,
        m.role
     FROM workspacemembers m
     JOIN workspace w 
        ON m.workspace_id = w.workspace_id
     WHERE m.user_id = $1`,
    [user_id]
  )
  return result.rows
}

export const checkMember = async(client, {workspace_id, created_by}) => {
   const result = await client.query(`SELECT * FROM workspacemembers WHERE workspace_id = $1 AND user_id = $2`,[workspace_id, created_by])
   return result
}
