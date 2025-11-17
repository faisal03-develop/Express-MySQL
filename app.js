import express from 'express';

const app = express()
const PORT = 8080;


app.get('/',(req,res) => {
    res.send('This is the main page...')
})

app.get('/notes',(req, res) => {
    res.send('This Should Render Notes')    
})

app.use((err,req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('Something Went Broke...')
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})