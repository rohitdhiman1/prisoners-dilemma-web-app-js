# Deploying to Cloudflare Pages

This guide explains how to deploy the Prisoner's Dilemma web app to Cloudflare Pages.

## Prerequisites

- A Cloudflare account.
- The project pushed to a GitHub repository.

## Deployment Steps

1.  **Log in to Cloudflare:**
    Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) and log in.

2.  **Connect to GitHub:**
    In the sidebar, go to **Workers & Pages** and click **Create application**. Connect your GitHub account and select the repository for this project.

3.  **Configure the Build:**
    - **Production branch:** Select the branch you want to deploy (e.g., `main`).
    - **Build command:** Leave this blank.
    - **Build output directory:** Leave this as `/`.

4.  **Deploy:**
    Click **Save and Deploy**. Cloudflare will now deploy your site. Once it's done, you'll get a unique URL where you can access the game.

That's it! Your Prisoner's Dilemma game is now live on Cloudflare Pages.
