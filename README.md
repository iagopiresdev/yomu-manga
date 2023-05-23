# Yomu Manga

Projeto fullstack desenvolvido como desafio técnico.

## Prerequisites

- Docker
- Docker Compose
- NPM package manager
- Node (18.16.0)
- PostgreSQL

## Instructions to clone the repo

### Init:
1. Clone the repository: `git clone https://github.com/iagopiresdev/fullstack-challenge`
2. Change to the project directory: `cd fullstack-challenge`

### Backend:
1. Change to the server directory: `cd server`
2. Create a `.env` file and add the required enviroment files (See below)
3. Build the Docker containers: `docker-compose up --build`
4. Runs on: http://localhost:4000 

### Frontend:
1. Change to the root directory: `cd ..` 
2. Change to the client directory: `cd client`
3. Install dependencies using npm: `npm install`

   OR
   
   Install dependencies using Yarn: `yarn install`
4. Create a `.env` file and add the required enviroment files (See below)
5. Run the command `npm run dev`

## Setting Up Required Environment Variables

### Frontend Environment Variables
| Variable Name      | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| VITE_API_HOST      | The URL for connecting to the database.                        |


### Backend Environment Variables
| Variable Name      | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| POSTGRES_USER      | The username for connecting to the PostgreSQL database.        |
| POSTGRES_PASSWORD  | The password for the PostgreSQL user.                          |
| POSTGRES_DB        | The name of the PostgreSQL database to be used.                |
| DATABASE_URL       | The URL or connection string for the PostgreSQL database.      |
| JWT_SECRET         | The secret key used for authentication and encryption.         |
| RAPID_API_KEY      | Required to access the RapidAPI APIs.                          |
| RAPID_API_HOST     | The host or base URL for the RapidAPI services or APIs.        |


## Extras

Feel free to ask me anything on iagopires.dev@gmail.com!

