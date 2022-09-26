import Questions from "./Questions.js"

const questionsList = Questions[Math.floor(Math.random() * Questions.length)]


const questions = document.querySelector(".question").style
const footer = document.querySelector(".footer").style
const time = document.querySelector(".time").style
const end = document.querySelector(".end").style

class Quiz{
    constructor() {
        this.$currentQues = 0
        this.$possibleQuestion = document.querySelector("#current-question")
        this.$possibleChoices = document.querySelectorAll(".choice")
        this.$error = document.querySelector("#error")
        this.$counter = document.querySelector("#counter")
        this.$timeLeft = document.querySelector("#timeLeft")
        this.$score = document.querySelector("#score")
        this.$next = document.querySelector(".next")
        this.$restart = document.querySelector("#restart")
        this.interval = ""
        console.log(this.$score)

        this.chosenAnswer = ""
        this.idButton = ""
        this.correctAnswer = 0        

        this.render()
        this.countDown()
        this.addEventListeners()
    }
    addEventListeners(){
        document.addEventListener("click", event => {
            this.selectAnswer(event)
            this.nextQuestion(event)
            this.$restart.addEventListener("click", () => {
                location.reload()
            })
        })
    }

    render(){
        this.interval = setInterval(this.countDown.bind(this), 1000)

        this.showQuestion(this.$currentQues)
    }

    countDown(){
        this.$timeLeft.textContent = this.seconds           
        this.seconds -= 1
        console.log(this.$timeLeft)

        if(this.seconds < 0){
            this.$currentQues++
            this.showQuestion(this.$currentQues)
        }
    }

    showQuestion(idx = 0){
        console.log(idx, questionsList.length)
        if(this.$next.textContent === "Finish"){
           this.showResult()
           return
        }
        if(idx + 1 === questionsList.length)
            this.$next.textContent = "Finish"

        this.seconds = 25
        this.chosenAnswer = ""
        this.removeSelected()
        this.$error.style.display = "none"
        console.log(idx)
        this.$currentQues = idx
        this.$counter.textContent = idx + 1
        const {question, choices} = questionsList[idx]
        this.$possibleQuestion.textContent = question
        for(let i = 0 ; i < 4; i++)
            this.$possibleChoices[i].textContent = choices[i]   
    }

    removeSelected(){
        this.$possibleChoices.forEach(choice => {
            choice.classList.remove("selected")
        })
    }
    selectAnswer(event){
        if(!event.target.matches(".choice")) return
        let SelectedButton = event.target.closest(".choice")
        this.idButton = parseInt(SelectedButton.dataset.id)
        this.removeSelected()
        this.$error.style.display = "none"
        SelectedButton.classList.add("selected")
        this.chosenAnswer = SelectedButton.textContent
    }
    
    nextQuestion(event){
        if(!event.target.matches(".next")) return
        if(this.chosenAnswer === ""){
            this.$error.style.display = "block"
            return
        }
        this.checkAnswer(this.chosenAnswer)
        this.$currentQues++
        this.showQuestion(this.$currentQues)
    }
    
    checkAnswer(chosen){
        if(chosen === questionsList[this.$currentQues].answer)
            this.correctAnswer++
            
    }

    showResult(){
        questions.display = "none"
        footer.display = "none"
        time.display = "none"
        end.display = "flex"
        this.$score.textContent = this.correctAnswer * 10;
        console.log(this.correctAnswer)
        window.setTimeout((function () {
            document.body.offsetHeight
            end.opacity = "1"
        }), 0.5)
        clearInterval(this.interval);
    }
    
}


const start = document.querySelector("#start")
start.addEventListener("click", () => {

    document.querySelector(".welcome").style.display = "none"

    questions.display = "block"
    
    footer.display = "flex"
    
    time.display = "flex"
    
    window.setTimeout((function () {
        document.body.offsetHeight
        questions.opacity = 1
        footer.opacity = "1"
        time.opacity = "1"
    }), 0.5)

    start.style.display = "none"
    new Quiz()
})
