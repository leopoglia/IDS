import { useEffect, useState, createContext } from "react"
import SockJS from 'sockjs-client';
import * as Stomp from "stompjs"

export const WebSocketContext = createContext(null);

export const WebSocketService = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const connect = () => {
            const socket = new SockJS('http://localhost:8443/api/ws');
            const stomp = Stomp.over(socket);

            stomp.connect({}, () => {
                setStompClient(stomp);
            }, (error) => {
                // console.log("Connection error: ", error)

                setTimeout(() => {
                    // console.log("Trying to reconnect...")
                    connect();
                }, 5000);
            })
        }
        connect();
    }, []);

    const disconnect = () => {
        if (stompClient) {
            stompClient.disconnect();
        }
    }

    const send = (destiny, message) => {
        if (stompClient) {
            stompClient.send(destiny, {}, JSON.stringify(message));
        } else {
            // console.log("Connection not established");
        }
    }

    const subscribe = (destiny, callback) => {
        // console.log(stompClient.subscriptions)

        return stompClient.subscribe(destiny, callback);
    }

    return (
        <WebSocketContext.Provider value={
            { stompClient, subscribe, disconnect, send }
        }>
            {children}
        </WebSocketContext.Provider>
    )
}