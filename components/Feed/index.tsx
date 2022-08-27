import {UIEventHandler, useEffect, useState} from 'react';
import type {NextPage} from 'next'
import { useAppContext } from '../../auth/authContext';
import { useChatContext } from '../../context/chat/ChatContext';
import { scrollToBottom } from '../../helpers/scrollToBottom';
import {types} from '../../types/types';
import { Loading } from '@nextui-org/react';
import { FeedItem } from './feedItem';

import client from '../../apollo-cliente';
import { pageUsuariosGQL } from '../../apollo-cliente/chat';
type TypeScroll = UIEventHandler<HTMLDivElement>
export const Feed: NextPage = () => {
    const {chatState, dispatch} = useChatContext()
    const {auth} = useAppContext()
    const [bandCargando, setBandCargando] = useState(false)
    
    const onScroll:TypeScroll = async (event)=>{
        let dif = event.currentTarget.scrollHeight - event.currentTarget.clientHeight
        let topCero = dif-event.currentTarget.scrollTop
        
        //Paginar 30 usuarios+ y zona muerta de 10pts
        if(topCero<10&&!bandCargando){                    
            setBandCargando(true)
            event.preventDefault();
            if(chatState.takeUsuarios<chatState.totalUsuarios){
                const nombreVariable='takeUsuarios'
                const valor=chatState.takeUsuarios+30
                //setTakeUsuarios(takeUsuarios+30)
                dispatch({
                    type: types.cambiarEstado,
                    payload: {nombreVariable, valor}
                });
                
                await client.cache.reset()
                const {usuarios} = await pageUsuariosGQL(chatState.skipUsuarios,valor)
                const total = chatState.totalUsuarios
                const totalConectados = chatState.totalOnline
                
                dispatch({
                    type: types.usuariosCargados,
                    payload: {usuarios,total,totalConectados}
                })
            }
            setBandCargando(false)
        }
      
    }

    useEffect(()=>{
        scrollToBottom('chatBox');
    },[]);

    if(chatState?.usuarios?.length! === 0){
        return (
            <div className='h-full wMid' >
                <h2 className='rightH2' >Lista de usuarios</h2>
                <Loading type="spinner" size="lg" />
            </div>
        )
    }

    if(chatState?.usuarios&&chatState?.usuarios?.length!>0){
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
            {bandCargando && 
                <div className='h-full wMid' >
                    <Loading type="spinner" size="lg" />
                </div>
            }
            </div>
        )
    }else{
        return <></>
    }
}
