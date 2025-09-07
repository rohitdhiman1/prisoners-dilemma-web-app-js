const Move = {
    COOPERATE: 'COOPERATE',
    DEFECT: 'DEFECT'
};

function createGame() {
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
    if (turn === 0) {
        return Move.COOPERATE; // Always start by cooperating
    }

    const userLastMove = game.userMoves[turn - 1];
    const random = Math.random();

    // Analyze user's overall behavior
    const userDefections = game.userMoves.filter(m => m === Move.DEFECT).length;
    const userCooperates = turn - userDefections;

    // If user is generally cooperative, be mostly cooperative but probe for exploitation
    if (userCooperates > userDefections) {
        if (userLastMove === Move.COOPERATE) {
            // 90% chance to cooperate, 10% to probe with a defection
            return random > 0.1 ? Move.COOPERATE : Move.DEFECT;
        } else { // User defected, retaliate (Tit-for-Tat)
            return Move.DEFECT;
        }
    }
    // If user is generally deceptive or balanced, be less forgiving
    else {
        if (userLastMove === Move.COOPERATE) {
            // User is trying to win back trust. 25% chance to forgive.
            return random > 0.75 ? Move.COOPERATE : Move.DEFECT;
        } else { // User defected again, retaliate strongly.
            // 95% chance to defect.
            return random > 0.05 ? Move.DEFECT : Move.COOPERATE;
        }
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
    if (game.getUserScore() >= 20 || game.getComputerScore() >= 20 || game.getTurn() >= 9) {
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
