// app/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { UserCard } from "@/components/UserCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type User = { id: string; email: string; role: string };

export default function UsersPage() {
    const fetcher = useFetch();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetcher("http://localhost:8000/users").then(setUsers);
    }, [fetcher]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Users</h1>
                <Link href="/users/new">
                    <Button>Invite User</Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {users.map((u) => (
                    <UserCard key={u.id} user={u} />
                ))}
            </div>
        </div>
    );
}
