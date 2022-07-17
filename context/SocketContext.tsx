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
import { Notificacion, NotiMensaje } from '../components/Notificaciones';
import { actualizarNotificacionGQL, nuevaNotificacionGQL } from '../apollo-cliente/notificacion';
import { useNotiContext } from './notificaciones/NotiContext';
import { typesNoti } from '../types/notificaciones';

const SocketContext = createContext({});


const SocketProvider = ({ children }:any) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket(urlSocket);
    const {auth,logout} = useAppContext();
    const {chatState,dispatch} = useChatContext();
    const notiContext = useNotiContext();
    const [changeDown, setChangeDown] = useState({band: false, de: 0})
    const [changeUp, setChangeUp] = useState({band: false, de: 0})
    const [changeUsersWithMsg, setChangeUsersWithMsg] = useState({band: false})
    const [newNotiMsj, setNewNotiMsj]:any = useState({band: false})
    //const [notisMsj, setNotisMsj] = useState([])
    let notisMsj = notiContext?.notiState?.msjs!

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
            
            setNewNotiMsj({band: true, mensaje})

            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje
            });
            
        });
    },[socket/*,dispatch*/])

    //apilar nueva notificacion
    useEffect(()=>{
        if(newNotiMsj.band){

            let bandActualizar = false
            const {mensaje} = newNotiMsj!            
            const newsNotiMsj:any = notisMsj.filter((n:any)=>{return n.de !== mensaje.de && n.para !== mensaje.para})
            
            setNewNotiMsj({band: false});

            let esNoti:any = {...notisMsj.find((n:any)=>{ return n.de === mensaje.de && n.para===mensaje.para })}
            
            if(esNoti?.id!){
                
                if(!esNoti.count){
                    esNoti.count=1
                }

                if(esNoti.time!==mensaje.time){
                    esNoti.time = mensaje.time
                    bandActualizar=true
                    esNoti.count++                    
                }

                esNoti.titulo=mensaje.nombre
                esNoti.mensaje='Tienes '+esNoti.count+' nuevos mensajes...'
                newsNotiMsj.push({...esNoti})
                
                if(auth?.id! === mensaje.de && (bandActualizar || esNoti.readed===1)){
                    if(esNoti.readed===1){
                        esNoti.count = 1
                        esNoti.titulo = mensaje.nombre
                        esNoti.mensaje = mensaje.mensaje
                        esNoti.readed = 0
                        esNoti.time = mensaje.time
                    }
                    const {id, de, para, count, titulo, time,readed} = esNoti     

                    actualizarNotificacionGQL({id,de,para,count, titulo, mensaje: esNoti.mensaje, time, readed})
                }

            }else{

                mensaje.titulo=mensaje.nombre+" dice:"
                mensaje.readed=0
                newsNotiMsj.push({...mensaje})                
                if(auth?.id! === mensaje.de){
                    const {id, de, para, count, titulo, time,readed} = mensaje
                    nuevaNotificacionGQL({id,de,para,count, titulo, mensaje: mensaje.mensaje, time, readed})
                }

            }
            
            notiContext.dispatch({type: typesNoti.nuevoMsj, payload:{mensajes: [newsNotiMsj[0]]}})
            //setNotisMsj(newsNotiMsj)

        }
    },[/*notisMsj,*/ newNotiMsj/*, chatState*/])
    
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