let userScore = 0;
let computerScore = 0;

const msg = $("#msg"); // Select the message element once instead of using .each()

const genComputerChoice = function() {
    const option = ["rock", "paper", "scissor"];
    const randId = Math.floor(Math.random() * 3);
    return option[randId];
};

const showWinner = function(userWin) {
    if (userWin) {
        console.log("You win");
        msg.text("You win!");  // Use jQuery's .text() to update the text of the element
    } else {
        console.log("You lose");
        msg.text("You lose!");  // Use jQuery's .text() to update the text of the element
    }
};

const draw = function() {
    console.log("Match draw");
    msg.text("Game draw!");  // Use jQuery's .text() to update the text of the element
};

const playGame = function(userChoice) {
    console.log("User choice = ", userChoice);
    const compChoice = genComputerChoice();
    console.log("Computer choice = ", compChoice);

    if (userChoice === compChoice) {
        draw();
    } else {
        let userWin = false;

        if (userChoice === "rock") {
            userWin = (compChoice === "scissor");
        } else if (userChoice === "paper") {
            userWin = (compChoice === "rock");
        } else if (userChoice === "scissor") {
            userWin = (compChoice === "paper");
        }

        showWinner(userWin);
    }
};

// Event handling for each choice
$(".choice").each(function() {
    console.log(this);
    $(this).on("click", function() {
        let userChoice = $(this).attr('id');
        console.log("Choice was clicked, id is " + userChoice);
        playGame(userChoice);
    });
});
