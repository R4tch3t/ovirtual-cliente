import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import {useSocket} from '../hooks/useSocket'
import { useAppContext } from '../auth/authContext';
import { useChatContext } from './chat/ChatContext';
import {types} from '../types/types';
import writingState from '../helpers/writingState';
import { urlSocket } from '../variables/url';
import { obtenerUsuariosGQL } from '../apollo-cliente/chat/obtenerUsuarios';
import { obtenerChatGQL } from '../apollo-cliente/chat';
import client from '../apollo-cliente';

const SocketContext = createContext({});


const SocketProvider = ({ children }:any) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket(urlSocket);
    const {auth,logout} = useAppContext();
    const {chatState,dispatch} = useChatContext();
    const [changeDown, setChangeDown] = useState({band: false, de: 0})
    const [changeUp, setChangeUp] = useState({band: false, de: 0})
    const [changeUsersWithMsg, setChangeUsersWithMsg] = useState({band: false})

    useEffect(()=>{
        if(auth?.logged){
            conectarSocket()
        }
    },[auth,conectarSocket]);

    useEffect(()=>{
        if(!auth?.logged){
            desconectarSocket()
        }
    },[auth,desconectarSocket]);

    //Escuchar los cambios en los usuarios conectados

    useEffect(()=>{

        socket?.on("getUsuarios",async ()=>{
            
                setChangeUsersWithMsg({band: true})

        })
    },[socket/*,dispatch*/]);

    useEffect(()=>{
        const {band} = changeUsersWithMsg
        if(band){
            //const {usuarios, total, totalConectados} = await obtenerUsuariosGQL(0,30)
            setChangeUsersWithMsg({band: false})
            const {skipUsuarios, takeUsuarios} = chatState
            client.cache.reset().then(()=>{
            obtenerUsuariosGQL(skipUsuarios,takeUsuarios)
                .then(({usuarios, total, totalConectados})=>{                    
                    dispatch({
                        type: types.usuariosCargados,
                        payload: {usuarios,total,totalConectados}
                    })
                })
            })
        }

    },  [changeUsersWithMsg, chatState])

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
        socket?.on("logout",async()=>{
            await logout!()
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
            setChangeDown({band: true, de: payload.de})
        });

    },[socket])

    useEffect(()=>{
        if(changeDown.band){
            
            let usuarios: any = []
            const {de} = changeDown
            setChangeDown({band: false, de: 0})

            //usuarios = writingState(usuarios,de,true);            
            usuarios = writingState(chatState!.usuarios,de,true);
            dispatch({
                type: types.usuariosCargados,
                payload: {usuarios}
            });

        }
    },[changeDown, chatState])

    useEffect(()=>{
        
        socket?.on('writingUp',(payload:any)=>{
            setChangeUp({band: true, de: payload.de})           
        });
        
    },[socket/*,dispatch*/])

    useEffect(()=>{
        if(changeUp.band){
            
            let usuarios: any = []
            
            const {de} = changeUp
            setChangeUp({band: false, de: 0})

            usuarios = writingState(chatState!.usuarios,de,false);            

            dispatch({
                type: types.usuariosCargados,
                payload: {usuarios}
            });

        }
    },[changeUp, chatState])

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