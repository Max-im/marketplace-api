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

- use `.env.sample` to create `.env` file with an appropriate variables
- Run the command:
  ```sh
  npm run dev
  ```


## Testing
- Run the App localy (See the Development section)
- Open `http://localhost:3000/api-docs` in your browser to see the App available endpoints in swagger;

## Description
There are 3 mongoDB collections:
 - items
 - rents
 - history

### Items collection:
contains the items can be rented any user can create an item to rent with the `name`, `description` and `price` fields

### Rents collection:
contains the items already rented, once item is rented it can not be searched

### History collection:
contains renting history, once a user return an item, it removes from the renting collection and store into the history collection. The approach ensure the `rents` collection not to become too large to make a database request.
