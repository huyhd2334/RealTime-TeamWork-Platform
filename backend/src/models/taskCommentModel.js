export const createTaskComment = async(client, {task_id, user_id, content}) => {
    const query = `INSERT INTO taskcomments (task_id, user_id, content)
                    VALUES ($1, $2, $3)
                    RETURNING *`
    const value = [task_id, user_id, content]
    const result = await client.query(query, value)
    return result.rows[0]
}

export const deleteTaskComment = async(client, comment_id) => {
    const result = await client.query(`DELETE FROM taskcomments
                                     WHERE comment_id = $1 
                                     RETURNING *`, [comment_id])
    return result.rows[0]
}

export const findCommentById = async(client, comment_id) => {
    const result = await client.query(`SELECT * FROM taskcomments WHERE comment_id=$1`, [comment_id])
    return result.rows[0]
}

export const findCommentByTaskId = async(client, task_id) => {
    const result = await client.query(`SELECT * FROM taskcomments WHERE task_id=$1`, [task_id])
    return result.rows
}

