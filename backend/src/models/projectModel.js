
export const createProject = async(client, {workspace_id, project_name, description, created_by, status}) => {
    const query = `INSERT INTO projects (workspace_id,project_name, description, created_by, status)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *`
    const value = [workspace_id, project_name, description, created_by, status]
    const result = await client.query(query, value)
    return result.rows[0]
}

export const deleteProject = async(client, project_id) => {
    const result = await client.query(`DELETE FROM projects 
                                     WHERE project_id = $1 
                                     RETURNING *`, [project_id])
    return result.rows[0]
}

export const findByProjectId = async(client, project_id) => {
    const result = await client.query(`SELECT * FROM projects WHERE project_id=$1`, [project_id])
    return result.rows[0]
}


export const findByProjectName = async(client, project_name) => {
    const result = await client.query(`SELECT * FROM projects WHERE project_name=$1 `, [project_name])
    return result.rows
}

export const roleCheck = async(client, {project_id, created_by}) => {
    const result = await client.query(`
                                      SELECT role FROM workspacemembers m
                                      JOIN projects p ON m.workspace_id = p.workspace_id
                                      WHERE p.project_id = $1 AND m.user_id = $2`, [project_id, created_by]);
    
    console.log(result.rows)
    return result.rows
}


