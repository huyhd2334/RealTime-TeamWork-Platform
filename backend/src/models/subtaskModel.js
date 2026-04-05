export const createSubTask = async(client, {task_id, title, status, created_by}) => {
    const query = `INSERT INTO subtasks (task_id, title, status, created_by)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *`
    const value = [task_id, title, status, created_by]
    const result = await client.query(query, value)
    return result.rows[0]
}

export const deleteSubTask = async(client, subtask_id) => {
    const result = await client.query(`DELETE FROM subtasks
                                     WHERE subtask_id = $1 
                                     RETURNING *`, [subtask_id])
    return result.rows[0]
}

export const findSubTaskByTaskId = async(client, task_id) => {
    const result = await client.query(`SELECT * FROM subtasks WHERE task_id=$1`, [task_id])
    return result.rows
}

export const findBySubTaskId = async(client, subtask_id) => {
    const result = await client.query(`SELECT * FROM subtasks WHERE subtask_id=$1`, [subtask_id])
    return result.rows[0]
}


