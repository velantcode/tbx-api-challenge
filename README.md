# Toolbox API Challenge

## Install

- Clone this repository: `git clone https://github.com/velantcode/tbx-api-challenge.git`.

- Use `npm` to install packages and run the project.

- Commands

      # Install dependencies
      $ npm i

      # Generate documentation API
      $ npm run docs

      # Review and preformat code
      $ npm run lint

      # Run test
      $ npm test

      # Review, preformatted code, run test and generate docs before create the commit.
      $ npm run precommit

      # Serve with hot reload at localhost:8081 to dev
      $ npm run dev

      # Run Server in production
      $ npm run start

## Run in Docker

You can run the project in development or production environment using Docker. For use you must be run the next commands:

    # Develepment env
    $ npm run docker:dev

    # Production env
    $ npm run docker:prod

## Checking the API

      # Confirms that the server works
      http://localhost:8081/
      http://yourdomain.com/

      # Access to documentation in the broswer
      http://localhost:8081/apidoc
      http://yourdomain.com/apidoc

## More documentation about Express.js

Official documentation [Express.js](https://expressjs.com).

## Others docs

[APIDocs](https://apidocjs.com/).

[Standard JS](https://standardjs.com/).

[Mocha](https://mochajs.org/).

[Chai.js](https://www.chaijs.com/).
