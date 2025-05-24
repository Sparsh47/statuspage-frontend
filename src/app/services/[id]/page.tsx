"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { ServiceForm } from "@/components/ServiceForm";

type ServiceDetail = {
    id: number;
    name: string;
    slug?: string;
    description?: string;
    organization_id?: number;
    current_status: string;
    created_at: string;
    updated_at?: string;
};

export default function EditServicePage() {
    const { id } = useParams();                  // ◀️ grab the dynamic [id]
    const fetcher = useFetch();
    const [svc, setSvc] = useState<ServiceDetail | null>(null);

    useEffect(() => {
        if (!id) return;                           // ◀️ guard against undefined
        const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
        fetcher(`${base}/services/${id}`)
            .then(setSvc)
            .catch(console.error);
    }, [id, fetcher]);

    if (!svc) return <p className="p-6">Loading…</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Service</h1>
            <ServiceForm
                initial={svc}
                organizationId={svc.organization_id?.toString() ?? ""}
            />
        </div>
    );
}
