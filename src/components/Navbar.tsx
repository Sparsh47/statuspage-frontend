import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {

    return (
        <header className="w-full h-16 border-b border-neutral-800 bg-neutral-900 shadow-sm z-50 mb-10">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                {/* Brand */}
                <div className="flex items-center space-x-4 text-sm font-medium text-neutral-100">
                    <span className="text-lg font-semibold cursor-pointer">StatusBoard</span>
                </div>

                {/* Auth Buttons / User */}
                <div className="flex items-center space-x-2">
                    <SignedOut>
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="cursor-pointer border-neutral-700 text-neutral-200 hover:bg-neutral-800"
                        >
                            <SignInButton />
                        </Button>
                        <Button
                            size="sm"
                            asChild
                            className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white"
                        >
                            <SignUpButton />
                        </Button>
                    </SignedOut>

                    <SignedIn>
                        <div className="flex items-center justify-center gap-8">
                            <Link href="/dashboard">Dashboard</Link>
                            <div className="cursor-pointer">
                                <UserButton />
                            </div>
                        </div>
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
