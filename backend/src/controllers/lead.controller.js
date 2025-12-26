import { Lead } from "../models/lead.model.js";

const createLead = async (req, res) => {
    try {
        const { name, email, status } = req.body;

        if (!name || !email || !status) {
            return res.status(400).json({
                message: "All fields are required!"
            })
        }

        const existing = await Lead.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({
                message: "Lead already exists"
            });
        }

        const lead = await Lead.create({
            name,
            email: email.toLowerCase(),
            status
        });

        res.status(201).json({
            message: "Lead created successfully", lead
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        });
    }
}

const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find();

        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}

export {
    createLead,
    getLeads
}