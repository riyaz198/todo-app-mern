# Todo App (MERN + JWT Auth)

A full stack task manager where users register, log in, and manage their own todos.

## Tech Stack
- Frontend: React (Vite), Axios
- Backend: Node.js, Express
- Database: MongoDB Atlas, Mongoose
- Auth: JWT, bcrypt

## Features
- User registration and login
- Password hashing with bcrypt
- Protected REST APIs with JWT
- Add, complete, and delete todos
- Each user sees only their own data

## API Endpoints
| Method | URL | Description |
|---|---|---|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Login |
| GET | /api/todos | Get my todos |
| POST | /api/todos | Add todo |
| PUT | /api/todos/:id | Update todo |
| DELETE | /api/todos/:id | Delete todo |

## Run Locally
1. Clone the repo
2. `cd server`, then `npm install`
3. Create `.env` with `PORT`, `MONGO_URI`, `JWT_SECRET`
4. `npm run dev`
5. In a new terminal: `cd client`, `npm install`, `npm run dev`
