import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


async function getNotes() {
    const [notes] = await pool.query("SELECT * FROM notes")
    return notes
}

async function getNNote(id){
    cons[note] = await pool.query(`
        SELECT * FROM notes
        WHERE id = ?
        `,[id])
        return note;
}



const note = await getNotes(1)
console.log(note)