# Prisoner's Dilemma Web App

This is a simple web application that allows you to play the Prisoner's Dilemma game against an AI opponent named CLS-7.

## How to Play

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rohitdhiman1/prisoners-dilemma-web-app-js.git
    cd prisoners-dilemma-web-app-js
    ```

2.  **Start a local web server:**
    You need to serve the files from a local web server. If you have Node.js installed, you can run the following command from the project's root directory:
    ```bash
    npx http-server
    ```
    This will start a server, usually on `http://localhost:8080`.

3.  **Open the game:**
    Open your web browser and navigate to the URL provided by the http-server (e.g., `http://localhost:8080`).

That's it! The game will start automatically. Click "Cooperate" or "Defect" to make your move.

## Game Logic

The rules of the game are as follows:

- The user always plays first.
- The computer plays second, using a "Tit for Tat" strategy (it will cooperate on the first move, and then copy the user's previous move for all subsequent turns).
- **Scoring:**
    - If both players cooperate, they each get 3 points.
    - If one player cooperates and the other defects, the defector gets 5 points and the cooperator gets 0.
    - If both players defect, they each get 1 point.
- **Winning:** The first player to reach 20 points wins.
- **Turns:** The game has a maximum of 10 turns. If no one reaches 20 points by the end of the 10th turn, the player with the higher score wins.

## Deployment

This application is a static website and can be deployed to any static site hosting provider like GitHub Pages, Netlify, or Cloudflare Pages. See `README-CLOUDFLARE.md` for more details on deploying to Cloudflare Pages.
