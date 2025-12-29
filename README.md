# Lead Management App

A simple full-stack Lead Management application built to demonstrate practical experience with **Next.js**, **Node.js**, **REST APIs**, and **databases**. 

A live demo of the web app can be found at https://lead-management-app-eta.vercel.app/. 

The backend is deployed at https://lead-management-app-95jy.onrender.com.

---

## Tech Stack

### Frontend
- Next.js 
- React
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB (Mongoose)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Features

### Lead Model
Each lead contains:
- `name` (string, required)
- `email` (string, required, unique)
- `status` (one of: New, Engaged, Proposal Sent, Closed-Won, Closed-Lost)
- `createdAt` (timestamp)

---

## API Endpoints

### GET /leads
Fetch all existing leads.

**Response**
```json
[
  {
    "_id": "64f8c9...",
    "name": "Jane Doe",
    "email": "janedoe@gmail.com",
    "status": "New",
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
]
```

### POST /leads
Create a new lead

**Request Body**
```
{
  "name": "Jane Doe",
  "email": "janedoe@gmail.com",
  "status": "New"
}
```
**Response**
```
{
  "_id": "64f8c9...",
  "name": "Jane Doe",
  "email": "janedoe@gmail.com",
  "status": "New",
  "createdAt": "2025-01-01T12:00:00.000Z"
}
```
---

## Running Locally
### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas connection string
- Clone this repository:
  ```
  git clone https://github.com/SamuelJJGoh/lead-management-app.git
  ```
### Backend Setup
1) Install dependencies
```
cd backend
npm install
```
2) Create a .env file:
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
```
3) Start the backend:
```
npm run dev
```
4) Backend runs at:
```
http://localhost:4000
```

### Frontend Setup
1) Install dependencies
```
cd frontend
npm install
```
2) Create a .env.local file:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```
3) Start the frontend:
```
npm run dev
```
4) Frontend runs at:
```
http://localhost:3000
```
---
## Deployment
### Backend (Render)

- Deployed as a Web Service
- Connected to MongoDB Atlas
- CORS configured to allow frontend access

### Frontend (Vercel)

- Environment variable configured:
```
NEXT_PUBLIC_API_BASE_URL=https://<backend-name>.onrender.com
```
---
## Notes

Render free tier may cold-start after inactivity; the first request may take a few seconds.
