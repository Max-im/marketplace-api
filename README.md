# Peer-to-Peer Rental Platform API

> A platform that allows users to rent items from each other in a peer-to-peer fashion. Users can list items for rent, browse available items, and manage their rentals through the platform.

## Tech
- Node.js
- Express.js
- MongoDB
- TypeScript
- Swagger

## Development
- Clone this repository in the current folder:
  ```sh
  git clone https://github.com/Max-im/marketplace-api . 
  ```
- Make sure your current Node.js version is 20 or higher:
  ```
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
  nvm use 20
  ```

- Use `.env.sample` to create `.env` file with appropriate variables. If you don't provide `.env`, the App's database will work in memory.
- Run the command:
  ```sh
  npm run dev
  ```

## Testing
- Run the App locally (See the Development section)
- Open `http://localhost:3000/api-docs` in your browser to see the App available endpoints in Swagger.

## Description
There are 3 MongoDB collections:
 - items
 - rents
 - history

### Items collection:
Contains the items that can be rented. Any user can create an item to rent with the `name`, `description`, and `price` fields.

### Rents collection:
Contains the items already rented. Once an item is rented, it cannot be searched.

### History collection:
Contains renting history. Once a user returns an item, it is removed from the renting collection and stored in the history collection. This approach ensures the `rents` collection does not become too large, making database requests more efficient.
