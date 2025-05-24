// app/teams/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";

type Team = { id: string; name: string };

export default function TeamsPage() {
    const fetcher = useFetch();
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        fetcher("http://localhost:8000/team").then(setTeams);
    }, [fetcher]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Teams</h1>
                <Link href="/teams/new">
                    <Button>New Team</Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teams.map((t) => (
                    <Link key={t.id} href={`/teams/${t.id}`}>
                        <Card className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700">
                            <CardContent className="p-4">{t.name}</CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
