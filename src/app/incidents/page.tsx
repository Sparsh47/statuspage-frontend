// File: src/app/incidents/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Incident = {
    id: number;
    title: string;
    status: string;
};

export default function IncidentsPage() {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
        fetch(`${base}/public/incidents`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json() as Promise<Incident[]>;
            })
            .then((data) => setIncidents(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className="p-6 text-center text-zinc-500">Loading incidents…</p>;
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Incidents</h1>
                <Link href="/incidents/new">
                    <Button>New Incident</Button>
                </Link>
            </div>

            {incidents.length === 0 ? (
                <p>No incidents at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {incidents.map((i) => (
                        <Link key={i.id} href={`/incidents/${i.id}`}>
                            <Card className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700">
                                <CardContent className="p-4 flex justify-between">
                                    <span>{i.title}</span>
                                    <span className="font-mono">{i.status}</span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
