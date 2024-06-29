import express from 'express'

const app = express()
app.set('view engine', 'ejs')

app.set('views',__dirname + '/web/')


//Quiz game
app.get('/', (req, res) => {
    res.render('quizGame/index')
})
app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/web/quizGame/script.js')
})

app.get('/quiz/game.json', (req, res) => {
    res.sendFile(__dirname + '/web/quizGame/game.json')
})


app.get('/src/web/output.css', (req, res) => {
    res.sendFile(__dirname + '/web/output.css')
})

app.listen(3000, () => {
    console.log('Listening at port 3000')
})

module.exports = app;   