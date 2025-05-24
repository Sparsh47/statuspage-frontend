// File: src/components/IncidentForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

interface IncidentFormProps {
    initial?: {
        id: string;
        title: string;
        description?: string;
        type?: string;
        status?: string;
        impact?: string;
    };
}

export function IncidentForm({ initial }: IncidentFormProps) {
    const isEdit = Boolean(initial?.id);

    const [title, setTitle] = useState(initial?.title ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [incidentType, setIncidentType] = useState(initial?.type ?? "incident");
    const [status, setStatus] = useState(initial?.status ?? "investigating");
    const [impact, setImpact] = useState(initial?.impact ?? "minor");

    const fetcher = useFetch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title: title.trim(),
            description: description.trim() || undefined,
            incident_type: incidentType,
            status,
            impact,
        };

        const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
        try {
            if (isEdit) {
                await fetcher(`${base}/incidents/${initial!.id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                });
            } else {
                await fetcher(`${base}/incidents/`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                });
            }
            router.push("/incidents");
        } catch (err: any) {
            console.error("Error saving incident:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded p-2"
                />
            </div>

            <div>
                <Label htmlFor="type">Type</Label>
                <select
                    id="type"
                    value={incidentType}
                    onChange={(e) => setIncidentType(e.target.value)}
                    className="w-full border rounded p-2"
                >
                    <option value="incident">Incident</option>
                    <option value="maintenance">Maintenance</option>
                </select>
            </div>

            <div>
                <Label htmlFor="status">Status</Label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border rounded p-2"
                >
                    <option value="investigating">Investigating</option>
                    <option value="identified">Identified</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>

            <div>
                <Label htmlFor="impact">Impact</Label>
                <select
                    id="impact"
                    value={impact}
                    onChange={(e) => setImpact(e.target.value)}
                    className="w-full border rounded p-2"
                >
                    <option value="minor">Minor</option>
                    <option value="major">Major</option>
                    <option value="critical">Critical</option>
                </select>
            </div>

            <Button type="submit">
                {isEdit ? "Update Incident" : "Create Incident"}
            </Button>
        </form>
    );
}
