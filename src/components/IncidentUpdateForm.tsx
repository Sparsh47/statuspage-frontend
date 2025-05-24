// File: src/components/IncidentUpdateForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export function IncidentUpdateForm({
                                       incidentId,
                                   }: {
    incidentId: string;
}) {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("investigating");
    const fetcher = useFetch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            incident_id: parseInt(incidentId, 10),
            message,
            status,
        };
        const urlBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
        try {
            await fetcher(`${urlBase}/incidents/${incidentId}/updates`, {
                method: "POST",
                body: JSON.stringify(payload),
            });
            router.refresh(); // refresh incident detail page if needed
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
                <Label>Message</Label>
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label>Status</Label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded p-2 w-full"
                >
                    <option value="investigating">Investigating</option>
                    <option value="identified">Identified</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>
            <Button type="submit">Add Update</Button>
        </form>
    );
}
