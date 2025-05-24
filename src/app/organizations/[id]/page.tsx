"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { OrganizationForm } from "@/components/OrganizationForm";

type Org = {
    id: number;                 // matches backend
    name: string;
    slug?: string | null;       // optional slug
    is_active: boolean;         // active flag
    created_at: string;         // ISO timestamp
    updated_at: string;         // ISO timestamp
};

export default function EditOrgPage() {
    const params = useSearchParams();
    const id = params.get("id")!;
    const fetcher = useFetch();
    const [org, setOrg] = useState<Org | null>(null);

    useEffect(() => {
        fetcher(`http://localhost:8000/organization/${id}`).then(setOrg);
    }, [id, fetcher]);

    if (!org) return <p>Loading…</p>;
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Organization</h1>
            <OrganizationForm initial={org} />
        </div>
    );
}
