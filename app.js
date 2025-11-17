import express from 'express';
import { deleteNote,getNote, getNotes, createNote } from './database.js';

const app = express()
const PORT = 8080;
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res) => {
    res.render("main.ejs")
})


app.get('/notes', async (req, res) => {
    const searchContent = req.query.searchContent
    const notes = await getNotes(searchContent)
    res.render("notes.ejs",
        {notes}
    )    
})

app.post('/createnote',async(req,res)=>{
    const {title,contents} = req.body
    const note = await createNote(title,contents)
    res.redirect('/notes')   
})

app.get('/notes/:id', async(req, res) => {
    const id = +req.params.id
    const note = await getNote(id)
    if(!note){
        res.status(404).render("note404.ejs")
    }
    res.render("note.ejs",{note})
})

app.post('/notes/:id/delete', async (req, res) => {
    const id = +req.params.id
    await deleteNote(id)
    res.redirect('/notes')
})

app.get('/createNote',(req,res)=>{
    res.render("createNote.ejs")
})

app.use((err,req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('Something Went Broke...')
})

app.use(express.static('public'))

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})