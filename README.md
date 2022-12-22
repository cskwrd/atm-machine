

<div align="center">
  <a href="https://split-app00.herokuapp.com/">
    <img src="https://github.com/cskwrd/atm-machine/blob/master/client/public/static/logo.png?raw=true" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">ATM Machine</h2>

  <p align="center">
    Build with the MERN stack (MongoDB, Express, React and NodeJS).
    <br />
    <a href="https://github.com/cskwrd/atm-machine/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://split-app00.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/cskwrd/atm-machine/issues">Report Bug</a>
    ·
    <a href="https://github.com/cskwrd/atm-machine/issues">Request Feature</a>
  </p>
</div>

![ATM Machine](https://raw.githubusercontent.com/cskwrd/atm-machine/master/Screenshots/dashboard-main-transparent.png)

## MERN Stack Group Expense Splitting Application

  * [Introduction](#introduction)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Database](#database)
  * [Configuration and Setup](#configuration-and-setup)
  * [License](#license)


## Introduction
Self-hosted expense splitting application for splitting expenses with friends... or enemies!

![Features](https://raw.githubusercontent.com/cskwrd/atm-machine/master/Screenshots/combined-screenshot.png)

## Key Features
- Create user groups and track group expense 
- Keep track of shared expenses and settle your corresponding balances in a convenient and personalized way. 
- Get Analytical graphs to understand your expenditure trend 
- Multiple user registration.
- Authentication using JSON web token (JWT) 


## Technologies used
This project was created using the following technologies.

#### Frontend

- React JS
- Redux (for managing and centralizing application state)
- Axios (for making api calls)
- Material UI (for User Interface)
- Chart.js (To display various analytics graphs)
- React-chartjs-2  
- Gravitar (for user profile picture)

#### Backend

- Express
- Mongoose
- JWT (For authentication)
- bcryptjs (for data encryption)

#### Database
MongoDB

## Self-hosted Setup
To host this application yourself, the only supported option at this time is via `docker compose`.

1. Clone this repo your docker host.
1. In a terminal window, navigate to the cloned repo.
1. Create `.env` file, by running: `echo "ATM_MACHINE_TOKEN_SECRET=$(head --bytes=256 /dev/urandom | base64 --wrap=0)" > .env`
1. Run: `docker compose -f docker-compose.yml up -d`
1. If successful, app will be available at: `http://<your-docker-host>:8090`

## Dev Setup
In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine. 
- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal
```
$ cd client
$ npm install (to install client-side dependencies)
$ npm start (to start the client)
```

In the second terminal (*in the project root directory (back-end))

```
$ cd server
$ npm install (to install server-side dependencies)
```

- Create a file named `.env`, in the `server` directory.
- Supply the following credentials
```
PORT=3001
MONGODB_URI=<address to mongo db>
ACCESS_TOKEN_SECRET=<secret key, see below>
```

You can generate a secret key using node. Enter the below command in the terminal to genrate a random secret key:
```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

Save the `.env` file and run:
```
$ npm start
```

## Comment
I intend to keep adding more features to this application, so if you like it, please give it a star, that will encourage me to 
to keep improving the project.

## License

Licensed under the terms of the [GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html) as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
See [LICENSE](LICENSE) for more details.
