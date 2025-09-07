const Move = {
    COOPERATE: 'COOPERATE',
    DEFECT: 'DEFECT'
};

const PERSONALITIES = ['CAUTIOUS', 'AGGRESSIVE', 'UNPREDICTABLE'];
let computerPersonality;

function createGame() {
    // Assign a random personality to the computer at the start of each game
    computerPersonality = PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)];
    
    return {
        userScore: 0,
        computerScore: 0,
        turn: 0,
        userMoves: [],
        computerMoves: [],
        gameOver: false,
        winner: null
    };
}

function getComputerMove(game) {
    const turn = game.turn;
    const userMoves = game.userMoves;
    const userLastMove = userMoves[turn - 1];

    switch (computerPersonality) {
        case 'CAUTIOUS':
            // Starts with cooperation, classic Tit-for-Tat with forgiveness
            if (turn === 0) return Move.COOPERATE;
            if (userLastMove === Move.DEFECT) {
                // Forgive with a 15% chance to break defection cycles
                return Math.random() < 0.15 ? Move.COOPERATE : Move.DEFECT;
            }
            return Move.COOPERATE;

        case 'AGGRESSIVE':
            // Starts with defection, looks for exploitation
            if (turn === 0) return Move.DEFECT;
            if (userLastMove === Move.DEFECT) {
                return Move.DEFECT;
            }
            // High chance to probe even if user cooperates
            return Math.random() < 0.3 ? Move.DEFECT : Move.COOPERATE;

        case 'UNPREDICTABLE':
            // Wild card, less reliant on user's last move
            if (turn < 2) { // Random opening
                return Math.random() < 0.5 ? Move.COOPERATE : Move.DEFECT;
            }
            // 40% chance to just do the opposite of what the user did
            if (Math.random() < 0.4) {
                return userLastMove === Move.COOPERATE ? Move.DEFECT : Move.COOPERATE;
            }
            // Otherwise, random move
            return Math.random() < 0.5 ? Move.COOPERATE : Move.DEFECT;
        
        default:
            // Fallback to a simple Tit-for-Tat
            if (turn === 0) return Move.COOPERATE;
            return userLastMove;
    }
}

function updateScores(game, userMove, computerMove) {
    if (userMove === Move.COOPERATE && computerMove === Move.COOPERATE) {
        game.setUserScore(game.getUserScore() + 3);
        game.setComputerScore(game.getComputerScore() + 3);
    } else if (userMove === Move.COOPERATE && computerMove === Move.DEFECT) {
        game.setComputerScore(game.getComputerScore() + 5);
    } else if (userMove === Move.DEFECT && computerMove === Move.COOPERATE) {
        game.setUserScore(game.getUserScore() + 5);
    } else { // Both defect
        game.setUserScore(game.getUserScore() + 1);
        game.setComputerScore(game.getComputerScore() + 1);
    }
}

function checkGameOver(game) {
    if (game.getTurn() >= 9) { // Game ends after 10 turns (turns 0-9)
        game.setGameOver(true);
        if (game.getUserScore() > game.getComputerScore()) {
            game.setWinner("User");
        } else if (game.getComputerScore() > game.getUserScore()) {
            game.setWinner("CLS-7");
        } else {
            game.setWinner("Draw");
        }
    }
}

function play(game, userMove) {
    if (game.gameOver) {
        return game;
    }

    const newGame = JSON.parse(JSON.stringify(game)); // Deep copy to avoid state mutation

    const computerMove = getComputerMove(newGame);
    newGame.userMoves.push(userMove);
    newGame.computerMoves.push(computerMove);

    // Shim methods for score setting
    newGame.getUserScore = function() { return this.userScore; };
    newGame.setUserScore = function(score) { this.userScore = score; };
    newGame.getComputerScore = function() { return this.computerScore; };
    newGame.setComputerScore = function(score) { this.computerScore = score; };
    newGame.getTurn = function() { return this.turn; };
    newGame.setGameOver = function(isOver) { this.gameOver = isOver; };
    newGame.setWinner = function(winner) { this.winner = winner; };

    updateScores(newGame, userMove, computerMove);
    checkGameOver(newGame);

    newGame.turn++;
    
    // Clean up shim methods before returning
    delete newGame.getUserScore;
    delete newGame.setUserScore;
    delete newGame.getComputerScore;
    delete newGame.setComputerScore;
    delete newGame.getTurn;
    delete newGame.setGameOver;
    delete newGame.setWinner;

    return newGame;
}
