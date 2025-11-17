import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


export async function getNotes(searchContent) {
    const [notes] = await pool.query("SELECT * FROM notes")
    if(!searchContent){
        return notes
    }
    return notes.filter(note => note.title.includes(searchContent) || note.contents.includes(searchContent))
}

export async function getNote(id){
    const [note] = await pool.query(`
        SELECT * FROM notes
        WHERE id = ?
        `,[id])
        return note[0];
}

export async function updateNote(id, title, contents){
    const [note] = await pool.query(`
        UPDATE notes 
        SET title = ?, contents = ?
        WHERE id = ?
        `,[title,contents,id])
}

export async function deleteNote(id){
    const [note] = await pool.query(`
        DELETE FROM notes
        WHERE id = ?
        `,[id])
}

export async function createNote(title, contents){
    const [results] = await pool.query(`
        INSERT INTO notes (title,contents)
        VALUES (?,?)`,
    [title,contents])
    return {
        id: results.insertId,
        title,
        contents
    }
}

