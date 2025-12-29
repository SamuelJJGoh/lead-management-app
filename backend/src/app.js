import express from "express"
import cors from "cors";
import leadRouter from './routes/lead.route.js';

const app = express();

// CORS options to only allow requests from frontend running on port 3000 and the site deployed on Vercel
const corsOptions = {
    origin: ["http://localhost:3000", "https://lead-management-app-eta.vercel.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
};


app.use(express.json());
app.use(cors(corsOptions));

app.use('/leads', leadRouter);
// example : http://localhost:4000/leads/createLead

export default app
