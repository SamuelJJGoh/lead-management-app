"use client";

import { useState } from "react";

const STATUSES = ["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"];

export default function LeadForm({ onCreate }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("New");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const leadData = {
            name: name.trim(),
            email: email.trim(),
            status
        };

        if (!leadData.name) return setError("Name is required");
        if (!leadData.email) return setError("Email is required");

        try {
            setIsSubmitting(true);

            let result;
            if (onCreate) {
                result = await onCreate(leadData);
            } else {
                result = undefined;
            }
            
            if (result && result.ok === true) {
                // reset form
                setName("");
                setEmail("");
                setStatus("New");
            } else {
                if (result && result.message) {
                    setError(result.message);
                } else {
                    setError("Failed to add new lead.");
                }
            }   
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="rounded-3xl border-2 border-blue-900 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Add New Lead</h2>
            <p className="mt-1 text-sm text-neutral-600">Create a lead to start tracking progress.</p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-800">Name</label>
                    <input 
                        className="mt-1 w-full rounded-xl border border-blue-900 px-3 py-2 text-sm focus:border-neutral-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-800">Email</label>
                    <input 
                        className="mt-1 w-full rounded-xl border border-blue-900 px-3 py-2 text-sm focus:border-neutral-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="janedoe@gmail.com"
                        type="email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-800">Status</label>
                    <select 
                        className="mt-1 w-full rounded-xl border border-blue-900 bg-white px-3 py-2 text-sm focus:border-neutral-400"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {STATUSES.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>

                { error ? (
                    <div className="w-full rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
                        {error}
                    </div>
                ) : null}

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-orange-400 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-300 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                    {isSubmitting ? "Adding..." : "Add Lead"}
                </button>
            </form>
        </div>
    )
}