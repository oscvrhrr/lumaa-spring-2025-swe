# Full-Stack Solution
This is a Task Management app, a solution for the Full-Stack Challenge. The app allows CRUD functionality and is written in TypeScript with a Nestjs backend.

[![Watch the demo](https://cdn.loom.com/sessions/thumbnails/61dc2afff6ff4f64b4cabdb3b2ceb7fe-100e010b173d948f-full-play.gif)](https://www.loom.com/share/61dc2afff6ff4f64b4cabdb3b2ceb7fe)


The application allows users to:

## Features

- [x] Register (sign up) and Log in (sign in).
- [x] View a list of tasks.
- [x] Create a new task.
- [x] Update an existing task (e.g., mark complete, edit).
- [x] Delete a task.
- [x] Password hashing

## Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Node.js, NestJS, TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT, bcrypt
- **Salary Expectations: 27$**


## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Setup Client](#setup-client)
4. [Setup Environment Variables & Database](#setup-environment-variables--database)
5. [Setup Server](#setup-server)
6. [API Endpoints](#api-endpoints)
   - [Auth](#auth)
   - [Tasks](#tasks)



## Prerequisites

- Node.js
- npm
- PostgreSQL

## Installation

Follow the steps below to set up the project.


## Setup Client

Navigate to the `client` directory and run the following commands:

```bash
cd client
npm install
npm run dev
```
The client is running on port 3000

## Setup Environment Variables & Database

Create a `.env` file in the `server` directory and add the necessary environment variables:

```bash
# Example .env file
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
JWT_SECRET=randomsecret
PORT=4001 #required
```


## Setup server

Navigate to the `server` directory and run the following commands:

```bash
cd server
npm install
npm run start:dev
```



Once you ready to migrate schema into your database run the following command:

```bash
# Terminal
npx prisma db push
npx prisma studio

```

## API Endpoints

## Auth
| Description | Method | URL |
| ----------- | ------ | --- |
| login user | POST | /auth/login |
| register user | POST | /users/register |

## Tasks
| Description | Method | URL |
| ----------- | ------ | --- |
| retrieves a list of tasks from authenticated user | GET | /tasks |
| create new task | POST | /tasks |
| update a task (e.g., mark as complete, edit text) | PUT | /tasks/:id |
| delete a task | DELETE | /tasks/:id |