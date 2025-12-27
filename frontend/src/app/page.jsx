"use client";

import LeadForm from "@/components/LeadForm";
import LeadList from "@/components/LeadList";
import { useEffect, useState } from 'react';
import axios from "axios";

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchLeads = async () => { 
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_BASE_URL}/leads`);
      setLeads(response.data)
    } catch (error) {
        setError(error.message || "Failed to fetch leads");
        setLeads([]);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateLead = async (leadData) => {
    try {
      setError("");

      const response = await axios.post(
        `${API_BASE_URL}/leads`,
        leadData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const createdLead = response.data;

      if (createdLead && typeof createdLead === "object") {
        setLeads((prevLeads) => [createdLead, ...prevLeads]);
      } else {
        fetchLeads();
      }

      return { ok: true };
    } catch (error) {
      let message = "Failed to add lead.";

      if (error.response && error.response.data) {
        message = error.response.data.message || message;
      } else if (error.message) {
        message = error.message;
      }

      return { ok: false, message };
    }
  }


  useEffect(() => {
   fetchLeads();
  }, [])

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">Leads Management</h1>

      {error ? (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <LeadForm onCreate={handleCreateLead} />
        </div>

        <div className="md:col-span-3">
          <LeadList leads={leads} loading={loading} />
        </div>
      </div>
    </main>

  );
}