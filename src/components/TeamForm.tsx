"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export function TeamForm({
                             initial,
                             organizationId,
                         }: {
    initial?: { id: string; name: string; slug: string; description?: string };
    organizationId: string;
}) {
    const isEdit = Boolean(initial?.id);
    const [name, setName] = useState(initial?.name ?? "");
    const [slug, setSlug] = useState(initial?.slug ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");

    const fetcher = useFetch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name,
            slug,
            description: description || null,
            organization_id: parseInt(organizationId, 10),
        };
        const urlBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
        try {
            if (isEdit) {
                await fetcher(`${urlBase}/teams/${initial!.id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                });
            } else {
                await fetcher(`${urlBase}/teams/`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                });
            }
            router.push("/teams");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
                <Label>Name</Label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label>Slug</Label>
                <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label>Description</Label>
                <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
        </form>
    );
}
