"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ServiceSummary = {
    id: number;
    name: string;
    current_status: string;
};

export default function ServicesPage() {
    const [services, setServices] = useState<ServiceSummary[]>([]);
    const fetcher = useFetch();

    useEffect(() => {
        const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
        fetcher(`${base}/services/`)
            .then(setServices)
            .catch(console.error);
    }, [fetcher]);

    console.log("Services: ",services);

    return (
        <main className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">All Services</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {services.map((svc) => (
                    <Link href={`/services/${svc.id}`} key={svc.id}>
                        <Card className="cursor-pointer hover:shadow-lg">
                            <CardContent className="flex justify-between items-center">
                                <span className="font-medium">{svc.name}</span>
                                <Badge>{svc.current_status}</Badge>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </main>
    );
}
