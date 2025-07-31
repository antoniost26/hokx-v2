# hokx-v2 - Advanced World of Tanks Discord Bot

## Overview

`hokx-v2` is a significant upgrade to a legacy Discord bot, designed to offer a more robust and flexible system for managing a World of Tanks (WoT) gaming community. This bot leverages the WoT API to not only fetch game data but also to implement custom, rule-based role management within a Discord server.

This project showcases a more sophisticated approach to community management, featuring a user-friendly account linking system and a planned database for tracking community engagement. This bot is a demonstration of real-time, API-driven server automation.

## Key Features

- **Customizable Role Rules:** The bot allows for the creation of custom rules to automatically assign or remove Discord roles based on a user's in-game World of Tanks statistics.
- **WoT Account Linking:** Provides a dedicated system for Discord users to securely link their World of Tanks accounts, enabling personalized role assignments and data retrieval.
- **Upcoming Booster Tracking:** A future feature that will use a database to keep a persistent record of server boosts and grant boosters custom roles.
- **Robust WoT API Integration:** Fetches up-to-date player and clan data from the official World of Tanks API to ensure accuracy in role assignments.

## Project Structure

The project is structured for clarity and maintainability:

```
hokx-v2/
├── src/                # All source code for the bot's logic and commands
├── .env.example        # Example file for environment variables (API keys)
├── config.json         # Configuration file for bot settings
├── package.json        # Node.js dependencies
└── README.md           # This file
```

## Technologies Used

- **Node.js:** The core runtime environment.
- **Discord.js:** The primary library for interacting with the Discord API.
- **World of Tanks API:** The external API for fetching all game-related data.
- **Database (Planned):** Implementation of a database (e.g., SQLite, MongoDB) to support the upcoming booster tracking feature and other persistent data needs.

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- A Discord Bot Token
- A World of Tanks Application ID (API Key)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/antoniost26/hokx-v2.git](https://github.com/antoniost26/hokx-v2.git)
    cd hokx-v2
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Configuration

1.  Rename `.env.example` to `.env` and fill in your sensitive information:
    ```
    DISCORD_BOT_TOKEN="YOUR_DISCORD_BOT_TOKEN"
    WOT_APP_ID="YOUR_WOT_APPLICATION_ID"
    ```

2.  Edit the `config.json` file with your server-specific settings and custom role rules.

### Running the Bot

To start the bot, run the following command in your terminal:

```bash
node src/index.js
```

(Note: The main bot file might be named bot.js or main.js depending on the project structure. Please adjust the command accordingly.)

License
This project is licensed under the MIT License.