"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStatusWebSocket } from "@/hooks/useStatusWebSocket";

type PublicIncident = {
    id: number;
    title: string;
    description?: string;
    status: string;
    type: string;
    created_at: string;
};

type PublicService = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    organization_id: number | null;
    current_status: string;
    created_at: string;
    updated_at: string;
};

type PublicStatusResponse = {
    services: PublicService[];
    incidents: PublicIncident[];
    updated_at: string;
};

export default function StatusPage() {
    const [services, setServices] = useState<PublicService[]>([]);
    const [statusData, setStatusData] = useState<PublicStatusResponse | null>(
        null
    );

    // Initial load
    useEffect(() => {
        const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
        Promise.all([
            fetch(`${base}/public/status`).then((r) => r.json()),
            fetch(`${base}/public/services`).then((r) => r.json()),
        ])
            .then(([statusJson, servicesJson]) => {
                setStatusData(statusJson);
                setServices(servicesJson);
            })
            .catch(console.error);
    }, []);

    // Realtime updates
    useStatusWebSocket((event) => {
        switch (event.event_type) {
            case "service":
                setServices((prev) =>
                    prev.map((svc) =>
                        svc.id === event.id
                            ? { ...svc, current_status: event.current_status }
                            : svc
                    )
                );
                break;

            case "incident":
                setStatusData((prev) => {
                    if (!prev) return prev;
                    const incoming: PublicIncident = {
                        id: event.id,
                        title: event.title,
                        description: event.description,
                        status: event.status,
                        type: event.type,
                        created_at: event.created_at,
                    };
                    const exists = prev.incidents.some((inc) => inc.id === incoming.id);
                    const updatedIncidents = exists
                        ? prev.incidents.map((inc) =>
                            inc.id === incoming.id ? incoming : inc
                        )
                        : [...prev.incidents, incoming];
                    return { ...prev, incidents: updatedIncidents };
                });
                break;

            default:
                console.warn("Unknown WS event_type:", event.event_type);
        }
    });

    if (!statusData) {
        return (
            <div className="p-6 text-center text-zinc-500">Loading status…</div>
        );
    }

    // Derive an overall system status and list of affected services
    const overallStatus =
        services.some((s) => s.current_status !== "operational")
            ? "Degraded"
            : "Operational";
    const affectedServices = services
        .filter((s) => s.current_status !== "operational")
        .map((s) => s.name);

    return (
        <main className="space-y-6 p-6">
            <h1 className="text-2xl font-bold">
                System Status: {overallStatus}
            </h1>

            {affectedServices.length > 0 && (
                <p>
                    Affected services:{" "}
                    {affectedServices.join(", ")}
                </p>
            )}

            <section>
                <h2 className="text-xl mb-2">Services</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((svc) => (
                        <Card key={svc.id}>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{svc.name}</span>
                                    <Badge>{svc.current_status}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl mb-2">Active Incidents</h2>
                {statusData.incidents.length === 0 ? (
                    <p>No active incidents.</p>
                ) : (
                    <div className="space-y-4">
                        {statusData.incidents.map((inc) => (
                            <Card key={inc.id}>
                                <CardContent>
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-medium">{inc.title}</h3>
                                            {inc.description && <p>{inc.description}</p>}
                                        </div>
                                        <Badge>{inc.status}</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
