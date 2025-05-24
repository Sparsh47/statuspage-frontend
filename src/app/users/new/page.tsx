// File: src/app/users/new/page.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function NewUserPage() {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [clerkId, setClerkId] = useState("");
    const fetcher = useFetch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            email,
            full_name: fullName || null,
            clerk_id: clerkId,
        };
        const urlBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
        try {
            await fetcher(`${urlBase}/users/`, {
                method: "POST",
                body: JSON.stringify(payload),
            });
            router.push("/users");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Create User</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label>Full Name</Label>
                    <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Clerk ID</Label>
                    <Input
                        value={clerkId}
                        onChange={(e) => setClerkId(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit">Create User</Button>
            </form>
        </div>
    );
}
