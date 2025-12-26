import express from "express"
import leadRouter from './routes/lead.route.js';

const app = express();

app.use(express.json());

app.use('/leads', leadRouter);
// example : http://localhost:4000/leads/createLead

export default app
