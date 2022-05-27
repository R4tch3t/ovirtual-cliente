import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import {useSocket} from '../hooks/useSocket'
import { useAppContext } from '../auth/authContext';
import { useChatContext } from './chat/ChatContext';
import {types} from '../types/types';
import writingState from '../helpers/writingState';
import { urlSocket } from '../variables/url';
import { obtenerUsuariosGQL } from '../apollo-cliente/chat/obtenerUsuarios';
import { obtenerChatGQL } from '../apollo-cliente/chat';

const SocketContext = createContext({});


const SocketProvider = ({ children }:any) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket(urlSocket);
    const {auth,logout}:any = useAppContext();
    const {dispatch}:any = useChatContext();

    useEffect(()=>{
        if(auth.logged){
            conectarSocket()
        }
    },[auth,conectarSocket]);

    useEffect(()=>{
        if(!auth.logged){
            desconectarSocket()
        }
    },[auth,desconectarSocket]);

    //Escuchar los cambios en los usuarios conectados

    useEffect(()=>{
        socket?.on("getUsuarios",async ()=>{
            const usuarios = await obtenerUsuariosGQL()
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            })
        })
    },[socket,dispatch]);

    //recargar mensajes del chat
    useEffect(()=>{
        socket?.on('recargarChat',async (payload:any)=>{
            
            const {mensajes} = await obtenerChatGQL(payload.de,payload.para,0,30)
            dispatch({
                type: types.cargarMensajes,
                payload: mensajes
            });
        });
    },[socket,dispatch])

    useEffect(()=>{
        socket?.on("logout",()=>{
            logout()
        })
    },[socket,logout]);

    useEffect(()=>{
        socket?.on('mensaje-personal',(mensaje:any)=>{
            
            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje
            });
            
        });
    },[socket,dispatch])

    useEffect(()=>{
        
        socket?.on('writingDown',(payload:any)=>{
            
            let {usuarios} = payload;
            usuarios = writingState(usuarios,payload.de,true);
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            });
            
        });

    },[socket,dispatch])

    useEffect(()=>{
        
        socket?.on('writingUp',(payload:any)=>{
            
            let {usuarios} = payload;
            usuarios = writingState(usuarios,payload.de,false);
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            });
           
        });
        
    },[socket,dispatch])

    

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}

export function useSocketContext(){
    return useContext(SocketContext);
}

export default SocketProvider