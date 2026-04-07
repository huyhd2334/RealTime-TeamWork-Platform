import pool from "../../config/db.js"

const findByUserAccount = async(user_account) => {
        console.log("INPUT user_account:", user_account)
        const result = await pool.query(`SELECT * FROM users WHERE user_account = $1`, [user_account])
        return result.rows[0]
}

const findByUserId = async(user_id) => {
        const result = await pool.query(`SELECT * FROM  users WHERE user_id = $1`, [user_id])
        return result.rows[0]
}

const findByUserIdTx = async(client, user_id) => {
        const result = await client.query(`SELECT * FROM  users WHERE user_id = $1`, [user_id])
        return result.rows[0]
}

const findByUserEmail = async(email) => {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
        return result.rows[0]
}

const deleteUserAccount = async(user_account) => {
        const result = await pool.query(`DELETE FROM users WHERE user_account = $1`, [user_account])
        return result.rows[0]
}       

const updateUserAccount = async (user_account, data) => {
    const result = await pool.query(
        `UPDATE users 
         SET user_name = $1, avatar_url = $2
         WHERE user_account = $3
         RETURNING *`,
        [data.user_name, data.avatar_url, user_account]
    );
    return result.rows[0];
};

const addAccount = async({user_account, user_name, email, password_hash, avatar_url, user_status}) => { 
        const query = `INSERT INTO users (user_account, user_name, email, password_hash, avatar_url, status)
                       VALUES ($1, $2, $3, $4, $5, $6)
                       RETURNING * `
        const value = [user_account, user_name, email, password_hash, avatar_url, user_status || "activate"]
        const result = await pool.query(query, value)
        return result.rows[0]
}

export {
    findByUserAccount,
    findByUserEmail,
    deleteUserAccount,
    updateUserAccount,
    addAccount,
    findByUserId,
    findByUserIdTx
};

