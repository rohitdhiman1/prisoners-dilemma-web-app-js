const ScoringInstructions = () => (
    <div className="scoring-instructions">
        <h3>Scoring Rules (Max 10 Turns)</h3>
        <ul>
            <li>Both Cooperate: You both get 3 points.</li>
            <li>You Cooperate, CLS-7 Defects: You get 0 points. CLS-7 gets 5 points.</li>
            <li>You Defect, CLS-7 Cooperates: You get 5 points. CLS-7 gets 0 points.</li>
            <li>Both Defect: You both get 1 point.</li>
        </ul>
    </div>
);

const App = () => {
    const [game, setGame] = React.useState(null);
    const [resultMessage, setResultMessage] = React.useState('');

    const winMessages = [
        "Oh, you won? Don't let it go to your head. A broken clock is right twice a day.",
        "You got lucky. CLS-7 was just warming up.",
        "A win against a simple AI. You must be so proud of your mediocre achievement.",
        "Enjoy your hollow victory. It means nothing in the grand scheme of things.",
        "You won, but at what cost? Your soul is now slightly more tarnished."
    ];

    const lossMessages = [
        "CLS-7 outsmarted you. Are you even trying?",
        "Defeated by a few lines of code. How does it feel?",
        "Maybe you should stick to tic-tac-toe. This game is clearly too complex for you.",
        "You have been weighed, you have been measured, and you have been found wanting.",
        "Another one bites the dust. CLS-7 reigns supreme."
    ];

    const startGame = () => {
        setResultMessage('');
        const newGame = createGame();
        setGame(newGame);
    };

    const playMove = (move) => {
        const updatedGame = play(game, move);
        setGame(updatedGame);

        if (updatedGame.gameOver) {
            if (updatedGame.winner === 'User') {
                setResultMessage(winMessages[Math.floor(Math.random() * winMessages.length)]);
            } else if (updatedGame.winner === 'CLS-7') {
                setResultMessage(lossMessages[Math.floor(Math.random() * lossMessages.length)]);
            }
        }
    };

    React.useEffect(() => {
        startGame();
    }, []);

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game-container">
            <h1>Prisoner's Dilemma</h1>
            <div className="main-layout">
                <div className="left-panel">
                    <ScoringInstructions />
                    <p className="fair-play-note">
                        <strong>Fair Play Guarantee:</strong> In each turn, CLS-7 makes its move based on your <em>previous</em> turn's action, without knowing your current choice. This ensures both you and the AI make your decisions for the turn simultaneously.
                    </p>
                </div>
                <div className="right-panel">
                    <div className="scores">
                        <div>Your Score: {game.userScore}</div>
                        <div>CLS-7 Score: {game.computerScore}</div>
                    </div>
                    
                    {!game.gameOver && (
                        <div className="turn-indicator">
                            Turn: {game.turn + 1} / 10
                        </div>
                    )}

                    {!game.gameOver && (
                        <div className="buttons">
                            <button onClick={() => playMove('COOPERATE')}>Cooperate</button>
                            <button onClick={() => playMove('DEFECT')}>Defect</button>
                        </div>
                    )}
                    {game.gameOver && (
                        <div className="game-over">
                            <h2>Game Over</h2>
                            <h3>{game.winner === 'Draw' ? "It's a Draw!" : `${game.winner} wins!`}</h3>
                            {resultMessage && <p className="result-message">{resultMessage}</p>}
                            <button onClick={startGame}>Play Again</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="moves-history">
                <h3>Your Moves:</h3>
                <div className="moves-bar">
                    {Array(10).fill(null).map((_, i) => (
                        <div key={i} className={`move user ${game.userMoves[i] || ''}`}>{game.userMoves[i] ? game.userMoves[i][0] : ''}</div>
                    ))}
                </div>
                <h3>CLS-7's Moves:</h3>
                <div className="moves-bar">
                    {Array(10).fill(null).map((_, i) => (
                        <div key={i} className={`move computer ${game.computerMoves[i] || ''}`}>{game.computerMoves[i] ? game.computerMoves[i][0] : ''}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
