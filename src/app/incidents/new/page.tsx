// File: app/incidents/new/page.tsx
"use client";

import { IncidentForm } from "@/components/IncidentForm";

export default function NewIncidentPage() {
    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Incident</h1>
            <IncidentForm />
        </div>
    );
}
