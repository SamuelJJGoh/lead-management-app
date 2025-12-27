import express from "express"
import cors from "cors";
import leadRouter from './routes/lead.route.js';

const app = express();

// CORS options to only allow requests from frontend running on port 3000
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,POST', 
    allowedHeaders: ['Content-Type'] 
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/leads', leadRouter);
// example : http://localhost:4000/leads/createLead

export default app
