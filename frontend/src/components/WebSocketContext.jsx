
import React, { useEffect, createContext, useRef } from "react";

const WebSocketContext = createContext()

function WebSocketProvider({ children }) {
    const ws = useRef(null)
    useEffect(() => {
        /* WS initialization and cleanup */

        const ip = "127.0.0.1:8000"
        const url = `ws://${ip}/ws/socket-server/`;

        ws.current = new WebSocket(url)
        ws.current.onopen = () => { console.log('WS open') }
        ws.current.onclose = () => { console.log('WS close') }
        ws.current.onmessage = (message) => {
          console.log(message)
        }
        return () => { ws.current.close() }
    }, [])

    /* WS provider dom */
    /* subscribe and unsubscribe are the only required prop for the context */
    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}

export { WebSocketContext, WebSocketProvider }