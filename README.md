# RNStoriesMVP API

This project is an API for a MVP stories functionality 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [PostgreSQL](https://www.postgresql.org/)
* [Node.js](https://nodejs.org/)

### Installing Local

Change the user to postgres

```
su - postgres
```

Create User for postgres

```
$ createuser testuser
```

Create Database

```
$ createdb rnstories
```

Clone the project

```
git clone https://github.com/vinicbs/RNStoriesMVP-API
```

Navigate to directory

```
cd RNStoriesMVP-API/
```

Install modules

```
npm install
```

Create a file named *.env* in the main project folder and copy the code below to setup the database

```
DB_HOST=*path to your localhost*
DB_USER=*database username*
DB_PASS=*database password*
DB_NAME=*database name*
```

Run the DB migrations

```
node node_modules/db-migrate/bin/db-migrate up
```

Run to start the API

```
npm start
```

## Commit messages

* **MAJOR**: Add new feature or some major changes in core functionalities
* **UPDATE**: Changes in core features that might affect functionalities
* **MINOR**: Minor changes that probably won't affect any functionalities
* **FIX**: Bugfixes

## External Modules Documentation

* [db-migrate](https://db-migrate.readthedocs.io/)
* [knex.js](https://knexjs.org/)
