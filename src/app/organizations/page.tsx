// app/organizations/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";

type Org = { id: number; name: string };

export default function OrganizationsPage() {
    const fetcher = useFetch();
    const [orgs, setOrgs] = useState<Org[]>([]);

    useEffect(() => {
        fetcher("http://localhost:8000/organization").then(setOrgs);
    }, [fetcher]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Organizations</h1>
                <Link href="/organizations/new">
                    <Button>New Org</Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {orgs.map((o) => (
                    <Link key={o.id} href={`/organizations/${o.id}`}>
                        <Card className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700">
                            <CardContent className="p-4">{o.name}</CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
