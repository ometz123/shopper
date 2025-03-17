# Project Setup and Instructions

This project is an NX monorepo that includes both a backend (NestJS) and a frontend (React), all written in TypeScript.
The backend is connected to MongoDB via Prisma.

## Prerequisites

Before you start, ensure you have the following tools installed:

- [pnpm](https://pnpm.io/) (for managing dependencies)
- [Node.js](https://nodejs.org/en/) (version 16 or higher)
- [Docker](https://www.docker.com/) (for running MongoDB with a replica set)

### MongoDB Setup

You can either:

- **Run MongoDB locally** using Docker with a replica set, or
- **Connect to a remote MongoDB instance**.

If you're running MongoDB locally, use Docker to set up a replica set:

```bash
docker start mongo
# Initialize the replica set if necessary
docker exec mongo mongosh --quiet --eval "rs.initiate();"
```

### Environment Variables

The project includes an .env.example file, which contains all the necessary environment variables. Copy this file and
rename it .env:

```bash
cp .env.example .env
```

Ensure that the values in the .env file are correctly configured, especially for MongoDB connection.

### Installation

To install the project dependencies, run:

```bash
pnpm install
```

### Setting Up Prisma

After installing dependencies, you need to set up Prisma:

1. Generate Prisma client:

```bash
pnpx prisma generate
```

Push the Prisma schema to the database:

```bash
pnpx prisma db push
```

This will create the necessary database tables and ensure Prisma is connected to your MongoDB instance.

### Running the Project
To start the backend and frontend servers, run the following commands in separate terminal windows or tabs (from the root folder):

Backend (NestJS):

```bash
nx serve backend 
```

Frontend (React):

```bash
nx serve frontend 
```

#### Troubleshooting
If you encounter issues with MongoDB or Prisma, double-check your .env file and ensure MongoDB is running with the
correct replica set configuration.
If Prisma commands fail, ensure that the database is properly set up and accessible.