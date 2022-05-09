// Start button function
$("#start").on("click", function () {
  // hide final page and high score page
  $(".card").hide();
  $(".highScorePage").hide();
  $(".final-page").hide();
  // show initial page info
  $(".timer").show();
  $(".timer").html("Time:60");
  $(".highScore").html("View Highscores");
  $(".question-display").show();
  $("#button-display").show();
  quizQuestion.run();
  quizQuestion.questionNumber = 0;
  quizQuestion.correctGuesses = 0;
  quizQuestion.incorrectGuesses = 0;
  quizQuestion.getQuestion();
  document.getElementById("userInput").value = " ";
});

// Quiz reset button function
$(".btn-secondary").on("click", function () {
  $(".highScorePage").hide();
  $(".final-page").hide();
  $(".timer").show();
  $(".timer").html("Time: 60");
  $(".highScore").html("View Highscores");
  $(".question-display").show();
  $("#button-display").show();
  quizQuestion.run();
  quizQuestion.questionNumber = 0;
  quizQuestion.correctGuesses = 0;
  quizQuestion.incorrectGuesses = 0;

  quizQuestion.getQuestion();
});

// enter user initials for highscore page
$("#submitInitials").on("click", function () {
  $(".highScorePage").show();
  quizQuestion.highScorePage();
});

// reset highscores function
$("#resetScores").on("click", function () {
  localStorage.clear();
  $("#hsArray").hide();
});

// back button function
$("#goBack").on("click", function () {
  clearInterval(quizQuestion.countDownTimer);
  $(".question-display").hide();
  $("#button-display").hide();
  $(".highScorePage").hide();
  $(".card").show();
  $(".timer").show();
  $(".timer").html("Time: 60");
  $(".highScore").show();
  $("#hsArray").empty();
});

// Check against previous highscore
$(".highScore").on("click", function () {
  quizQuestion.counter = 0;
  quizQuestion.highScorePage();
});

// Answer selector button function
$("#button-display").on("click", ".answerButton", function (e) {
  const answerChoice = $(e.target).attr("data-name");
  console.log(e);
  console.log(e.target);
  console.log(e.target.data);
  console.log($(e.target).attr("data-name"));
  quizQuestion.checkAnswer(answerChoice);
});

// Global Variables
const Counter = 0;
const quizDirections = document.createElement("directions");
const highScore = 0;
const quizQuestion = {
  currentQuestion: "",
  correctGuesses: 0,
  incorrectGuesses: 0,
  counter: 0,
  countDownTimer: null,
  questionNumber: 0,

  // Question array pulled from W3Schools
  questions: [
    {
      questionText: "Inside which HTML element do we put the JavaScript?",
      questionAnswer: ["<scripting>", "<script>", "<js>", "<javascript>"],
      answer: "<script>",
    },
    {
      questionText: "Where is the correct place to insert a JavaScript?",
      questionAnswer: [
        "Both in the <head> section and the <body> section are correct",
        "The <head> section",
        "The <body> section",
        "The <javascript> section",
      ],
      answer: "Both in the <head> section and the <body> section are correct",
    },
    {
      questionText:
        'What is the correct syntax for referring to an external script called "xxx.js"?',
      questionAnswer: [
        '<script name = "xxx.js">',
        '<script src = "xxx.js">',
        '<script href = "xxx.js">',
        '<script call = "xxx.js">',
      ],
      answer: '<script src = "xxx.js">',
    },
    {
      questionText: 'How do you write "Hello World" in an alert box?',
      questionAnswer: [
        'msg("Hello World");',
        'msgBox("Hello World");',
        'alert("Hello World");',
        'alertBox("Hello World");',
      ],
      answer: 'alert("Hello World");',
    },
    {
      questionText: "How do you create a function in JavaScript?",
      questionAnswer: [
        "function myFunction[]",
        "function = myFunction()",
        "function:myFunction()",
        "function myFunction()",
      ],
      answer: "function = myFunction()",
    },
    {
      questionText: 'How do you call a function named "myFunction"?',
      questionAnswer: [
        "call function myFunction()",
        "call myFunction()",
        "myFunction()",
        "function.myFunction()",
      ],
      answer: "myFunction()",
    },
    {
      questionText: "How to write an IF statement in JavaScript?",
      questionAnswer: [
        "if(i == 5)",
        "if i == 5 then",
        "if i = 5",
        "if i = 5 then",
      ],
      answer: "if(i == 5)",
    },
    {
      questionText:
        'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
      questionAnswer: [
        "if(i <> 5)",
        "if i <> 5",
        "if i =! 5 then",
        "if (i != 5)",
      ],
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

  // Timer run function for 60 seconds
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
      // hide question and button display upon timeout
      $(".question-display").hide();
      $("#button-display").hide();
    }
  },

  // Get question function
  getQuestion: function () {
    $(".question-display").empty();
    $(".correct-answer").empty();
    $(".ready").empty();
    $(".question-display").html(
      "<p>" + this.questions[this.questionNumber].questionText + "</p>"
    );
    this.buttonGenerator();
  },

  // Answer button function
  buttonGenerator: function () {
    $("#button-display").empty();
    for (
      var i = 0;
      i < this.questions[this.questionNumber].questionAnswer.length;
      i++
    ) {
      $("#button-display").append("<li>");
      var a = $("<button>");
      a.addClass("answerButton");
      a.attr(
        "data-name",
        this.questions[this.questionNumber].questionAnswer[i]
      );
      a.text(this.questions[this.questionNumber].questionAnswer[i]);
      $("#button-display").append(a);
      $("#button-display").append("</li>");
    }
  },

  // Check answer choice function
  checkAnswer: function (answerChoice) {
    console.log(this.questions[this.questionNumber]);
    if (answerChoice === this.questions[this.questionNumber].answer) {
      this.correctGuesses++;
      $(".correct-answer").html("<directions id='set-show'/>Correct!");
      this.questionNumber++;
    } else {
      this.incorrectGuesses++;
      quizQuestion.counter = quizQuestion.counter - 10;
      $(".correct-answer").html("<directions id='lose'/> Wrong!");
      this.questionNumber++;
    }
    this.answerPage();
  },

  // Final page function
  answerPage: function () {
    setTimeout(function () {
      if (quizQuestion.questionNumber < quizQuestion.questions.length) {
        quizQuestion.getQuestion();
      } else {
        quizQuestion.finalPage();
      }
    }, 1000);
  },

  viewHighScore: function () {
    $(".highScore").html("Highscore: " + highScore);
  },

  // show and hide functions for final page
  finalPage: function () {
    $(".question-display").empty();
    $("#button-display").empty();
    $(".correct-answer").empty();
    $(".timer").hide();
    $(".final-page").show();
    $("#message").html("<h2>That's all!</h2><p>How you did:</p>");
    $("#score").html("Total score is " + quizQuestion.counter);
    $("#correct").html("How many you got right: " + this.correctGuesses);
    $("#incorrect").html("How many you missed: " + this.incorrectGuesses);
    clearInterval(quizQuestion.countDownTimer);
  },

  // show and hide functions for highscore page
  highScorePage: function () {
    clearInterval(quizQuestion.countDownTimer);
    $(".card").hide();
    $(".final-page").hide();
    $(".timer").hide();
    $(".timer").html("Time: 60");
    $(".highScore").hide();
    $(".question-display").hide();
    $("#button-display").hide();
    $(".highScorePage").show();
    $("#hsArray").show();

    // Initial info
    const initialInput = document
      .getElementById("userInput")
      .value.toUpperCase()
      .substring(0, 4);
    if (initialInput == false) {
      console.log("You must enter your initials!:");
      initialInput = "***";
    }

    const scoreValues = {
      score: quizQuestion.counter,
      initials: initialInput,
    };
    console.log(scoreValues);

    // Localstorage array for high scores
    const highScoresArray =
      JSON.parse(localStorage.getItem("highScoresArray")) || [];
    highScoresArray.push(scoreValues);
    highScoresArray.sort((a, b) => b.score - a.score);
    highScoresArray.splice(5);
    // Add new high score to array
    localStorage.setItem("highScoresArray", JSON.stringify(highScoresArray));
    console.log(highScoresArray);

    // Map over highscores array with new initial inputs
    highScoresArray.map((scoreValues) => {
      if (scoreValues.score != 0) {
        $("#hsArray").append(
          "<li>" + scoreValues.initials + " --- " + scoreValues.score + "</li>"
        );
      }
    });
  },
};
