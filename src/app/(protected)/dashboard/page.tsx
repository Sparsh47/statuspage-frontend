"use client";

import Link from "next/link";

export default function DashboardPage() {
    const sections = [
        { name: "Services", href: "/services" },
        { name: "Organizations", href: "/organizations" },
        { name: "Teams", href: "/teams" },
        { name: "Incidents", href: "/incidents" },
        { name: "Users", href: "/users" },
        { name: "Public Status", href: "/public/status" },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((s) => (
                    <Link
                        key={s.href}
                        href={s.href}
                        className="block p-6 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 text-center"
                    >
                        {s.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
