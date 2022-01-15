// Start button function
$("#start").on("click", function () {
    $(".card").hide();
    console.log("user clicked start");
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time:60")
    $(".highScore").html("View Highscores");
    $(".question-display").show();
    $("#button-display").show();
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctGuesses = 0;
    quizQuestion.incorrectGuesses = 0;
    quizQuestion.getQuestion();
    document.getElementById('userInput').value = " ";
})

// Quiz reset button
$(".btn-secondary").on("click", function () {
    console.log("user clicked Restart");
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time: 60")
    $(".highScore").html("View Highscores");
    $(".question-display").show();
    $("#button-display").show();
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctGuesses = 0;
    quizQuestion.incorrectGuesses = 0;

    quizQuestion.getQuestion();
})

$("#submitInitials").on("click", function () {
    console.log("user clicked submit initials for high scores");
    $(".highScorePage").show();
    quizQuestion.highScorePage();
})

$("#resetScores").on("click", function () {
    console.log("user clicked reset high scores");
    localStorage.clear();
    $("#hsArray").hide();
})

$("#goBack").on("click", function () {
    console.log("user clicked to return from high scores high scores");
    clearInterval(quizQuestion.countDownTimer);
    $(".question-display").hide();
    $("#button-display").hide();
    $(".highScorePage").hide();
    $(".card").show();
    $(".timer").show();
    $(".timer").html("Time: 60");

    $(".highScore").show();
    $("#hsArray").empty();

})


// Check against previous highscore
$(".highScore").on("click", function () {
    console.log("user clicked highScore");
    quizQuestion.counter = 0;
    quizQuestion.highScorePage();
})


// Answer button targets
$("#button-display").on("click", ".answerButton", function (e) {
    // answerButton.clicked(e); 
    var selectedAnswer = $(e.target).attr("data-name");
    console.log(e);
    console.log(e.target);
    console.log(e.target.data);
    console.log($(e.target).attr("data-name"));
    quizQuestion.checkAnswer(selectedAnswer);
})

// Global Variables
var Counter = 0;
var hrLine = document.createElement("hr");
var highScore = 0;
var quizQuestion = {
    currentQuestion: "",
    correctGuesses: 0,
    incorrectGuesses: 0,
    counter: 0,
    countDownTimer: null,
    questionNumber: 0,


    // Question array
    questions: [
        {
            questionText: "Inside which HTML element do we put the JavaScript?",
            questionAnswer: ["<scripting>", "<script>", "<js>", "<javascript>"],
            answer: "<script>"
        },
        {
            questionText: "Where is the correct place to insert a JavaScript?",
            questionAnswer: ["Both in the <head> section and the <body> section are correct", "The <head> section", "The <body> section", "The <javascript> section"],
            answer: "Both in the <head> section and the <body> section are correct"
        },
        {
            questionText: 'What is the correct syntax for referring to an external script called "xxx.js"?',
            questionAnswer: ['<script name = "xxx.js">', '<script src = "xxx.js">', '<script href = "xxx.js">', '<script call = "xxx.js">'],
            answer: '<script src = "xxx.js">',
        },
        {
            questionText: 'How do you write "Hello World" in an alert box?',
            questionAnswer: ['msg("Hello World");', 'msgBox("Hello World");', 'alert("Hello World");', 'alertBox("Hello World");'],
            answer: 'alert("Hello World");',
        },
        {
            questionText: "How do you create a function in JavaScript?",
            questionAnswer: ["function myFunction[]", "function = myFunction()", "function:myFunction()", "function myFunction()"],
            answer: "function = myFunction()",
        },
        {
            questionText: 'How do you call a function named "myFunction"?',
            questionAnswer: ["call function myFunction()", "call myFunction()", "myFunction()", "function.myFunction()"],
            answer: "myFunction()",
        },
        {
            questionText: "How to write an IF statement in JavaScript?",
            questionAnswer: ["if(i == 5)", "if i == 5 then", "if i = 5", "if i = 5 then"],
            answer: "if(i == 5)",
        },
        {
            questionText: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
            questionAnswer: ["if(i <> 5)", "if i <> 5", "if i =! 5 then", "if (i != 5)"],
            answer: "if (i != 5)",
        },
        /*{
            questionText: "How does a WHILE loop start?",
            questionAnswer: ["while (i <= 10)", "while i = 1 to 10", "while(i <= 10;  i++)", "while i <= 10"],
            answer: "while (i <= 10)",
        },
        {
            questionText: "How can you add a comment in a JavaScript?",
            questionAnswer: ["<!--This is a comment-->", '"This is a comment"', "// This is a comment", "***This is a comment***"],
            answer: "// This is a comment",
        }*/
    ],

    // Timer run
    run: function () {
        clearInterval(this.countDownTimer);
        this.countDownTimer = setInterval(this.decrement, 1000);
        quizQuestion.counter = 60;
    },

    decrement: function () {
        quizQuestion.counter--;
        $(".timer").html("Time: " + quizQuestion.counter);
        if (quizQuestion.counter <= 0) {
            quizQuestion.counter = 0;
            clearInterval(quizQuestion.countDownTimer);
            quizQuestion.finalPage();
            
            //$("#initials").html("Sorry!  You timed out.")
            $(".question-display").hide();
            $("#button-display").hide();
        }
    },

    // Get question function
    getQuestion: function () {
        $(".question-display").empty();
        $(".areYouRight").empty();
        $(".ready").empty();
        $(".question-display").html("<p>" + this.questions[this.questionNumber].questionText + "</p>");
        this.buttonGenerator();
    },

    // Answer button function 
    buttonGenerator: function () {
        $("#button-display").empty();
        for (var i = 0; i < this.questions[this.questionNumber].questionAnswer.length; i++) {
            $("#button-display").append("<li>");
            var a = $("<button>");
            a.addClass("answerButton");
            a.attr("data-name", this.questions[this.questionNumber].questionAnswer[i]);
            a.text(this.questions[this.questionNumber].questionAnswer[i]);
            $("#button-display").append(a);  
            $("#button-display").append("</li>");          
        };
    },

    // Check answer choice function
    checkAnswer: function (selectedAnswer) {
        console.log(this.questions[this.questionNumber]);

        if (selectedAnswer === this.questions[this.questionNumber].answer) {
            console.log("win");
            this.correctGuesses++;
            console.log(this.correctGuesses);
            $(".areYouRight").html("<hr id='win'/>Correct!");
            this.questionNumber++;
        }
        else {
            console.log("lose");
            this.incorrectGuesses++;
            console.log(this.incorrectGuesses);
            quizQuestion.counter = quizQuestion.counter - 10;
            $(".areYouRight").html("<hr id='lose'/> Wrong!");  
            this.questionNumber++;
        }
        this.answerPage();
    },

    // Final page function
    answerPage: function () {
        setTimeout(function () {
            if (quizQuestion.questionNumber < quizQuestion.questions.length) {
                quizQuestion.getQuestion();
            }
            else {
                quizQuestion.finalPage();
            }
        }, 1000
        )
    },

    viewHighScore: function () {
        $(".highScore").html("Highscore: " + highScore);
    },

    finalPage: function () {
        $(".question-display").empty();
        $("#button-display").empty();
        $(".areYouRight").empty();
        $(".timer").hide();
        $(".final-page").show();
        $("#message").html("<h2>All done!</h2><p>Here are your results:</p>");
        $("#score").html("Your final score is " + quizQuestion.counter);
        $("#correct").html("Correct Guesses: " + this.correctGuesses);
        $("#incorrect").html("Incorrect Guesses: " + this.incorrectGuesses);
        clearInterval(quizQuestion.countDownTimer);
    },
    highScorePage: function () {
        clearInterval(quizQuestion.countDownTimer);
        $(".card").hide();
        $(".final-page").hide();
        $(".timer").hide();
        $(".timer").html("Time: 60")
        $(".highScore").hide();
        $(".question-display").hide();
        $("#button-display").hide();
        $(".highScorePage").show();
        $("#hsArray").show();
        

        console.log("completed highScore Page");

        // Initial info
        var boxValue = document.getElementById('userInput').value.toUpperCase().substring(0, 4); 
        if (boxValue == false){
            console.log("no value entered for initials:" + boxValue);
            boxValue = "***";
        };
        
        const scoreValues = {
            score: quizQuestion.counter,  
            initials: boxValue   
        };

        const MAX_HIGH_SCORES = 5;

        console.log(scoreValues);

        // Localstorage array for high scores
        const highScoresArray = JSON.parse(localStorage.getItem("highScoresArray")) || [];
        console.log(highScoresArray);

        highScoresArray.push(scoreValues);
        console.log(highScoresArray);
        highScoresArray.sort((a, b) => b.score - a.score);
        console.log(highScoresArray);
        highScoresArray.splice(5);

        localStorage.setItem('highScoresArray', JSON.stringify(highScoresArray));
        console.log(highScoresArray);

        // Create the list
        const highScoresList = document.getElementById("#hsArray");
        const highScores = JSON.parse(localStorage.getItem("highScoresArray")) || [];

            // Sorting mechanism for high scores array
            highScoresArray.map(scoreValues => {
                if(scoreValues.score !=0){
                console.log(scoreValues.initials + " --- " + scoreValues.score);
                $("#hsArray").append('<li>' + scoreValues.initials + " --- " + scoreValues.score + '</li>');
                }
            });
    }
}


