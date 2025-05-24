// components/UserCard.tsx
import { Card, CardContent } from "@/components/ui/card";

export function UserCard({
                             user,
                         }: {
    user: { id: string; email: string; role: string };
}) {
    return (
        <Card className="bg-zinc-900 border border-zinc-800">
            <CardContent className="p-4">
                <h3 className="font-medium">{user.email}</h3>
                <p className="text-sm text-zinc-400">{user.role}</p>
            </CardContent>
        </Card>
    );
}
