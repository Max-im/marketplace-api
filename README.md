# Polls CRUD

This project provides a simple CRUD (Create, Read, Update, Delete) API for managing polls. Users can create new polls, retrieve existing polls, update polls, and delete polls. The API also supports searching polls by their question field and includes plans for pagination and other features.

## Tech
- Node.js
- Express.js
- MongoDB
- TypeScript

## Postman
- [Postman Collection](./postman/polls.postman_collection.json)
- [Postman Environment](./postman/polls.postman_environment.json)

## Polls API
Method | Endpoint   | Description
------ | ---------- | ------------------------------------------
POST   | /polls     | Create a new poll
GET    | /polls     | Get all polls (with search and pagination)
GET    | /polls/:id | Get a specific poll by ID
PUT    | /polls/:id | Update a specific poll
DELETE | /polls/:id | Delete a specific poll

## Development
- Clone this repository in the current folder:
  ```sh
  git clone https://github.com/Max-im/polls-crud.git .
  ```
- Make sure your current Node.js version is 18 or higher:
  ``
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
  nvm use 20
  ```
- Run the command:
  ```sh
  npm run dev
  ```

## Production
- Run the command:
  ```sh
  docker-compose up
  ```