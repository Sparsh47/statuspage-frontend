import { useEffect } from "react";

export function useStatusWebSocket(onMessage: (data: any) => void) {
    useEffect(() => {
        const ws = new WebSocket(
            (process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000").replace(/^http/, "ws") + "/ws"
        );

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessage(data);
            } catch (err) {
                console.error("WebSocket parse error:", err);
            }
        };

        ws.onclose = () => console.info("WebSocket closed");
        ws.onerror = (err) => console.error("WebSocket error:", err);

        return () => {
            ws.close();
        };
    }, [onMessage]);
}
