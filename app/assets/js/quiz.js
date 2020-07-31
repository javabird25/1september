import '../css/quiz.sass';
import $ from 'jquery';

const ANSWER = 7;

let CHECKER_INPUT;
let MESSAGES;

$(() => {
    CHECKER_INPUT = $("checker input");
    MESSAGES = {
        CORRECT: $("message.correct"),
        WRONG: $("message.wrong")
    }
});

function resetCheckerInput() {
    CHECKER_INPUT.removeClass();
}

function resetChecker() {
    resetCheckerInput();
    MESSAGES.CORRECT.hide("fast");
    MESSAGES.WRONG.hide("fast");
}

const ANSWER_HANDLERS = {
    correct: () => {
        MESSAGES.CORRECT.show("fast");
        CHECKER_INPUT.addClass("correct");

        setTimeout(() => {
            window.location = "/photocompose/upload";
        }, 1000);
    },

    wrong: () => {
        MESSAGES.WRONG.show("fast");
        CHECKER_INPUT.addClass("wrong");
        setTimeout(() => {
            resetCheckerInput();
            CHECKER_INPUT.val("");
        }, 1000);
    }
}

window.checkNumber = () => {
    resetChecker();
    let input = CHECKER_INPUT.val();
    if (!input)
        return;

    let num = parseInt(input);
    if (num == ANSWER) {
        ANSWER_HANDLERS.correct();
    } else {
        ANSWER_HANDLERS.wrong();
    }
}
