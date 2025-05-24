// File: src/components/ServiceForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export function ServiceForm({
                                initial,
                                organizationId,
                            }: {
    initial?: {
        id: string;
        name: string;
        slug?: string;
        description?: string;
        current_status?: string;
    };
    organizationId?: string;
}) {
    const isEdit = Boolean(initial?.id);
    const [name, setName] = useState(initial?.name ?? "");
    const [slug, setSlug] = useState(initial?.slug ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [status, setStatus] = useState(initial?.current_status ?? "operational");

    const fetcher = useFetch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Compute a fallback slug if user left it blank
        const slugValue =
            slug.trim() ||
            name
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-");

        // 2. Ensure valid organization_id (default to 1 if missing)
        const orgId = parseInt(organizationId || "1", 10);

        const payload = {
            name: name.trim(),
            slug: slugValue,
            description: description?.trim() || null,
            organization_id: orgId,
            current_status: status,
        };

        const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
        try {
            if (isEdit) {
                await fetcher(`${base}/services/${initial!.id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                });
            } else {
                await fetcher(`${base}/services/`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                });
            }
            router.push("/services");
        } catch (err) {
            console.error("Failed to submit service:", err);
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
                    placeholder="Optional: generated from name if blank"
                />
            </div>
            <div>
                <Label>Description</Label>
                <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <Label>Status</Label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded p-2 w-full"
                >
                    {["operational", "degraded", "partial_outage", "major_outage"].map(
                        (s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        )
                    )}
                </select>
            </div>
            <Button type="submit">
                {isEdit ? "Update Service" : "Create Service"}
            </Button>
        </form>
    );
}
