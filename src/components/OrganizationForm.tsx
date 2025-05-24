"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export function OrganizationForm({
                                     initial,
                                 }: {
    initial?: {
        id: string;
        name: string;
        slug: string;
        description?: string;
        logo_url?: string;
        website?: string;
        is_active?: boolean;
    };
}) {
    const isEdit = Boolean(initial?.id);
    const [name, setName] = useState(initial?.name ?? "");
    const [slug, setSlug] = useState(initial?.slug ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [logoUrl, setLogoUrl] = useState(initial?.logo_url ?? "");
    const [website, setWebsite] = useState(initial?.website ?? "");
    const [isActive, setIsActive] = useState(initial?.is_active ?? true);

    const fetcher = useFetch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name,
            slug,
            description: description || null,
            logo_url: logoUrl || null,
            website: website || null,
            is_active: isActive,
        };
        const urlBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
        try {
            if (isEdit) {
                await fetcher(`${urlBase}/organizations/${initial!.id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                });
            } else {
                await fetcher(`${urlBase}/organizations/`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                });
            }
            router.push("/organizations");
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
            <div>
                <Label>Logo URL</Label>
                <Input
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                />
            </div>
            <div>
                <Label>Website</Label>
                <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>
            <div className="flex items-center">
                <Checkbox
                    id="isActive"
                    checked={isActive}
                    onCheckedChange={(checked) => setIsActive(Boolean(checked))}
                />
                <Label htmlFor="isActive" className="ml-2">
                    Active
                </Label>
            </div>
            <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
        </form>
    );
}
