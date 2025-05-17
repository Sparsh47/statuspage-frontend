import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MdSpeed, MdWarning, MdGroups } from "react-icons/md";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <main className="min-h-screen bg-neutral-900 text-neutral-100 pt-20">
            {/* Hero Section */}
            <section className="text-center py-20 px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    StatusBoard — Transparent Uptime Monitoring
                </h1>
                <p className="text-neutral-400 max-w-xl mx-auto mb-6">
                    A simple and reliable way to monitor service uptime, track incidents, and keep users informed in real time.
                </p>
                <div className="flex justify-center">
                    <SignInButton mode="redirect">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 text-sm font-medium cursor-pointer">
                            Get Started
                        </Button>
                    </SignInButton>
                </div>

            </section>

            {/* Feature Cards */}
            <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
                <Card className="bg-neutral-800 border border-neutral-700 hover:border-neutral-600 shadow-sm transition">
                    <CardContent className="p-6 flex flex-col items-start space-y-3">
                        <MdSpeed className="text-blue-400 w-7 h-7" />
                        <h3 className="text-lg font-semibold">Real-Time Monitoring</h3>
                        <p className="text-sm text-neutral-400">
                            Instantly detect outages and latency issues with live uptime metrics.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-neutral-800 border border-neutral-700 hover:border-neutral-600 shadow-sm transition">
                    <CardContent className="p-6 flex flex-col items-start space-y-3">
                        <MdWarning className="text-yellow-400 w-7 h-7" />
                        <h3 className="text-lg font-semibold">Incident Tracking</h3>
                        <p className="text-sm text-neutral-400">
                            Log incidents, post updates, and maintain transparency with your users.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-neutral-800 border border-neutral-700 hover:border-neutral-600 shadow-sm transition">
                    <CardContent className="p-6 flex flex-col items-start space-y-3">
                        <MdGroups className="text-purple-400 w-7 h-7" />
                        <h3 className="text-lg font-semibold">Organization & Team Support</h3>
                        <p className="text-sm text-neutral-400">
                            Manage multiple teams, assign roles, and collaborate on incidents efficiently.
                        </p>
                    </CardContent>
                </Card>
            </section>

            {/* Footer */}
            <footer className="text-center py-8 text-sm text-neutral-500 fixed bottom-0 left-1/2 transform -translate-x-1/2">
                &copy; {new Date().getFullYear()} StatusBoard. All rights reserved.
            </footer>
        </main>
    );
}
