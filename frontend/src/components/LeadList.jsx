"use client";

function formatDate(value) {
    if (!value) {
        return "—";
    }

    const date = new Date(value);
    const time = date.getTime();
    if (isNaN(time)) {
        return "—";
    }

    const formattedDate = date.toLocaleDateString();
    return formattedDate;
}

export default function LeadList({ leads = [], loading = false }) {

    return (
        <div className="rounded-3xl border-2 border-blue-900 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Leads</h2>
            <p className="mt-1 text-sm text-neutral-600">Existing leads in the database</p>

            <div className="mt-4 overflow-hidden rounded-xl border border-blue-900">
                <div className="grid grid-cols-12 bg-blue-100 px-3 py-2 text-xs font-semibold text-neutral-700">
                    <div className="col-span-3">Name</div>
                    <div className="col-span-4">Email</div>
                    <div className="col-span-3">Status</div>
                    <div className="col-span-2 text-right">Created</div>
                </div>

                {loading ? (
                    <div className="p-4 text-sm text-neutral-600">Loading leads...</div>
                ) : leads.length > 0 ? (
                    <ul className="divide-y">
                        {leads.map((lead) => {
                            const key = lead._id;
                            return (
                                <li key={key}>
                                    <div className="grid grid-cols-12 items-center px-3 py-3 text-sm">
                                        <div className="col-span-3 font-medium text-neutral-900">
                                        {lead.name || "-"}
                                        </div>
                                        <div className="col-span-4 text-neutral-700 truncate">
                                        {lead.email || "-"}
                                        </div>
                                        <div className="col-span-3 text-neutral-700">
                                        {lead.status || "-"}
                                        </div>
                                        <div className="col-span-2 text-right text-neutral-600">
                                        {formatDate(lead.createdAt)}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="p-4 text-sm text-neutral-600 text-center">
                        No leads yet.
                    </div>
                )}
            </div>
        </div>
    )
}