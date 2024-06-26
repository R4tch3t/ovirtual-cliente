import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';


export const useSocket = ( serverPath:any ) => {
    const [socket, setSocket]:any = useState(null)
    const [ online, setOnline ] = useState(false);

    const conectarSocket = useCallback(()=>{
        const token = Cookies.get("token")
        const socketTemp = io( serverPath, {
                transports: ['websocket'],
                autoConnect: true,
                forceNew: true,
                query: {
                    "x-token": token
                }
            });
            setSocket(socketTemp);
        
        
    },[serverPath]);

    const desconectarSocket = useCallback(()=>{
        socket?.disconnect();
    },[socket]);

    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}


