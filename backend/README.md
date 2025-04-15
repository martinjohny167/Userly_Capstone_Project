# User Management System Backend

This is the backend server for the User Management System.

## Database Connection Details

The backend is configured to connect to an Amazon RDS MySQL database with the following parameters (stored in .env file):

- **Host**: database-2.cy50qe2u6uhv.us-east-1.rds.amazonaws.com
- **Username**: admin
- **Password**: project1234
- **Database**: usermanagement
- **Port**: 3306 (default MySQL port)

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env` 
   - Update the values in `.env` with your database credentials

3. Set up the database:
   - Connect to your MySQL database using a client like MySQL Workbench
   - Run the SQL commands from `schema.sql` to create the database and tables

4. Start the server:
   ```
   npm start
   ```
   
   Or for development with auto-reload:
   ```
   npm run dev
   ```

## API Endpoints

- **GET /api/users** - Get all users
- **GET /api/users/:id** - Get a specific user by ID
- **POST /api/users** - Create a new user
- **PUT /api/users/:id** - Update a user
- **DELETE /api/users/:id** - Delete a user

### Authentication Endpoints

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login a user

## User Model

```
{
  "id": number,
  "name": string,
  "email": string,
  "role": "user" | "admin" | "manager",
  "password": string (hashed, never returned in API responses)
}
```

## Sample Request for Creating a User

```json
POST /api/users
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "user"
}
``` 