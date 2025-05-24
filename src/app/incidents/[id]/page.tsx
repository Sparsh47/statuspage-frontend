// File: app/incidents/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { IncidentForm } from "@/components/IncidentForm";
import { IncidentUpdateForm } from "@/components/IncidentUpdateForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type IncidentWithUpdates = {
    id: number;
    title: string;
    description?: string;
    status: string;
    type: string;
    updates: {
        id: number;
        message: string;
        status: string;
        created_at: string;
    }[];
};

export default function IncidentDetailPage() {
    const { id } = useParams();               // ← get the dynamic [id] segment
    const fetcher = useFetch();
    const [inc, setInc] = useState<IncidentWithUpdates | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("No incident ID in URL");
            return;
        }
        fetcher(`http://localhost:8000/incidents/${id}`)
            .then(setInc)
            .catch((err) => {
                console.error(err);
                setError(err.message);
            });
    }, [id, fetcher]);

    if (error) {
        return <p className="p-6 text-red-500">Error: {error}</p>;
    }
    if (!inc) {
        return <p className="p-6 text-gray-500">Loading incident…</p>;
    }

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold mb-2">{inc.title}</h1>
                <p className="text-sm text-zinc-400">{inc.type.toUpperCase()}</p>
                {inc.description && <p className="mt-2">{inc.description}</p>}
            </div>

            {/* Reuse your edit form if you want to allow updates inline */}
            <IncidentForm initial={inc as any} />

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Updates</h2>
                {inc.updates.length === 0 && (
                    <p className="text-zinc-500">No updates yet.</p>
                )}
                {inc.updates.map((u) => (
                    <Card key={u.id} className="bg-zinc-900 border border-zinc-800">
                        <CardContent className="p-4">
                            <p className="text-sm text-zinc-400">
                                {new Date(u.created_at).toLocaleString()}
                            </p>
                            <p className="mt-1">{u.message}</p>
                            <Badge className="mt-2 font-mono">{u.status}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <IncidentUpdateForm incidentId={id} onSuccess={() => {
                // reload after a new update
                fetcher(`http://localhost:8000/incidents/${id}`).then(setInc);
            }} />
        </div>
    );
}
