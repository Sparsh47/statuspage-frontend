// app/teams/[id]/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { TeamForm } from "@/components/TeamForm";

type Team = { id: string; name: string };

export default function EditTeamPage() {
    const params = useSearchParams();
    const id = params.get("id")!;
    const fetcher = useFetch();
    const [team, setTeam] = useState<Team | null>(null);

    useEffect(() => {
        fetcher(`http://localhost:8000/team/${id}`).then(setTeam);
    }, [id, fetcher]);

    if (!team) return <p>Loading…</p>;
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Team</h1>
            <TeamForm initial={team} />
        </div>
    );
}
