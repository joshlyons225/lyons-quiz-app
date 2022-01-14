// homepage start quiz button
$("#start-btn").on("click", function () {
    $("#frontpage").hide();
    $("#score-initals").hide();
    $("#timer").show();
    $("#questions").show();
    $("#answer-buttons").show();
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctGuesses = 0;
    quizQuestion.incorrectGuesses = 0;
    quizQuestion.getQuestion();
    document.getElementById('xInitials').value = " ";
})
   
// quiz question array
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
    {
        questionText: "How does a WHILE loop start?",
        questionAnswer: ["while (i <= 10)", "while i = 1 to 10", "while(i <= 10;  i++)", "while i <= 10"],
        answer: "while (i <= 10)",
    },
    {
        questionText: "How can you add a comment in a JavaScript?",
        questionAnswer: ["<!--This is a comment-->", '"This is a comment"', "// This is a comment", "***This is a comment***"],
        answer: "// This is a comment",
    }
],

// timer run
run function () {
    clearInterval(this.countDownTimer);
    this.countDownTimer = setInterval(this.decrement, 1000);
    quizQuestion.counter = 60;
},
decrement: function () {
    quizQuestion.counter--;
    $("#timer").html("Time Remaining: " + quizQuestion.counter);
    if (quizQuestion.counter <= 0) {
        quizQuestion.counter = 0;
        clearInterval(quizQuestion.countDownTimer);
        quizQuestion.finalPage();
        window.alert("Time is up!");

        $("#questions").hide();
        $("#answer-buttons").hide();
    }
},