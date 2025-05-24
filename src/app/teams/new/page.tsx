// app/teams/new/page.tsx
import { TeamForm } from "@/components/TeamForm";

export default function NewTeamPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Create Team</h1>
            <TeamForm />
        </div>
    );
}
