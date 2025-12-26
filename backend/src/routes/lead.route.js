import { Router } from "express";
import { createLead, getLeads } from "../controllers/lead.controller.js";

const router = Router();

router.route('/').post(createLead);
router.route('/').get(getLeads);

export default router;