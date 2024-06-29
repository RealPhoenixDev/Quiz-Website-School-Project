
const infoText = document.getElementById("infoText")
const text = document.getElementById("text")
const gameArea = document.getElementById("gameWindow")
const imageContainer = document.getElementById("imageContainer")

const field1 = document.getElementById("field1")
const field2 = document.getElementById("field2")
const field3 = document.getElementById("field3")
const field4 = document.getElementById("field4")

const result = document.getElementById("Result")
const submitButton = document.getElementById('Submit')
const nextButton = document.getElementById('Next')
const restartButton = document.getElementById('Restart')

const buttons = document.getElementsByName('selection')
const labels = document.getElementsByName('name')

let data = null
let score = 0
let correct = 0
let question = 0
let size = 0


fetch(new Request("/quiz/game.json"))
    .then( (responce) =>  responce.json())
    .then((json) => {data = json})



function startGame() {
    document.getElementById("startButton").style.display='none'
    gameArea.style.display = "block"
    correct = 0
    score = 0
    question = 0
    size = Object.keys(data).length
    submitButton.style.display = 'block'
    nextButton.style.display = 'none'
    result.style.display = 'none'
    restartButton.style.display = 'none'
    for (let i = 0; i<4;i++) {
        labels[i].style.backgroundColor = ''
    }
    getQuizData(question)
}

function getQuizData(id) {
    const test = id+1
    infoText.innerHTML = 'Jautājums ' + test + ' no ' + size + ', ' + data[id]['Points'] + 'p'
    text.innerHTML = data[id]['Text']
    field1.innerHTML = data[id]["0"]
    field2.innerHTML = data[id]["1"]
    field3.innerHTML = data[id]["2"]
    field4.innerHTML = data[id]["3"]
    imageContainer.style.backgroundImage =`url(${data[question]['Image']})`
    console.log(imageContainer.style.backgroundImage)
}

function submitAnswer() {
    let answer
    let buttonID
    for (let i = 0; i<buttons.length; i++) {
        if (buttons[i].checked){
            answer = buttons[i]
            buttonID = i
            break
        }
    }
    if (parseInt(buttonID) === parseInt(data[question]['Answer'])) {
        console.log('Correct answer')
        labels[buttonID].style.backgroundColor = '#56AE57'
        score += data[question]['Points']
        correct++
    } else {
        console.log('Incorrect answer')
        labels[buttonID].style.backgroundColor = '#FF6961 '
        labels[data[question]['Answer']].style.backgroundColor = '#56AE57'
    }
    submitButton.style.display = 'none'
    nextButton.style.display = 'block'

}

function nextQuestion() {
    if (question < size-1) {
        getQuizData(++question)
        submitButton.style.display = 'block'
        nextButton.style.display = 'none'
        for (let i = 0; i<4;i++) {
            labels[i].style.backgroundColor = ''
        }
    } else (showResult())
}

function showResult() {
    gameArea.style.display = 'none'
    result.style.display = 'block'
    result.innerHTML = correct + " no " + size + " jautājumiem ir pareizi! <br>Jums ir " + score + " punkti"
    restartButton.style.display = 'block'
}
