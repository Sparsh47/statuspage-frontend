"use client";
import { useAuth } from "@clerk/nextjs";
import { useCallback } from "react";

export function useFetch() {
    const { getToken } = useAuth();

    return useCallback(
        async (url: string, opts: RequestInit = {}) => {
            const token = await getToken();
            const res = await fetch(url, {
                ...opts,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    ...(opts.headers || {}),
                },
            });
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        },
        [getToken]
    );
}
