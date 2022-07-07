import {UIEventHandler, useEffect} from 'react';
import type {NextPage} from 'next'
import { useAppContext } from '../../auth/authContext';
import { useChatContext } from '../../context/chat/ChatContext';
import { scrollToBottom } from '../../helpers/scrollToBottom';
import {types} from '../../types/types';
import { Loading } from '@nextui-org/react';
import { FeedItem } from './feedItem';
import { useSocketContext } from '../../context/SocketContext';
import client from '../../apollo-cliente';
type TypeScroll = UIEventHandler<HTMLDivElement>

export const Feed: NextPage = () => {
    const {chatState, dispatch} = useChatContext()
    const {auth} = useAppContext()
    const {socket}:any = useSocketContext();
    /*const imageUrl=auth?.usuario?.avatar! ? auth?.usuario?.avatar! : 
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/480px-Avatar_icon_green.svg.png";
    

    const onClick = async ({currentTarget}:any,user:any) => {
        dispatch({
            type: types.activarChat,
            payload: user
        });
        const resp = await obtenerChatGQL(auth.id,user.id,0,30)
        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes
        });
        
        scrollToBottom('chatBox');
    }*/
    const onScroll:TypeScroll = async (event)=>{
        let dif = event.currentTarget.scrollHeight - event.currentTarget.clientHeight
        let topCero = dif-event.currentTarget.scrollTop
        
        //Paginar 30 mensajes+ y zona muerta de 10pts
        if(topCero<10){                    
            event.preventDefault();
            const nombreVariable='takeUsuarios'
            const valor=chatState.takeUsuarios+30
            dispatch({
                type: types.cambiarEstado,
                payload: {nombreVariable, valor}
            });
            
            await client.cache.reset()
            socket.emit("getUsuarios");
        }
      
    }

    useEffect(()=>{
        scrollToBottom('chatBox');
    },[]);

    if(chatState.usuarios.length===0){
        return (
        <div className='h-full wMid' >
            <h2 className='rightH2' >Lista de usuarios</h2>
            <Loading type="spinner" size="lg" />
        </div>)
    }

    if(chatState.usuarios.length>0){
        return (
            <div style={{maxHeight: 730, overflowY: 'auto'}} onScroll={onScroll} >
                <h2 className='rightH2' >Lista de usuarios</h2>
                <ul role="list" className="divide-y divide-gray-200">
                    {chatState.usuarios
                    .filter((user:any)=>user.id!==auth?.id)
                    .map((user: any) => (
                        <FeedItem key={user.id} user={user} />
                    )
                
                )}
            </ul>
            </div>
        )
    }else{
        return <></>
    }
}
