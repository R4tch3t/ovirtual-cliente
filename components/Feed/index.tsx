import type {NextPage} from 'next'
import { useAppContext } from '../../auth/authContext';
import { useChatContext } from '../../context/chat/ChatContext';
import { scrollToBottom } from '../../helpers/scrollToBottom';
import { diffDate } from '../../helpers/spellDate';
import {types} from '../../types/types';
import {useEffect} from 'react';
import { Loading } from '@nextui-org/react';
import { obtenerChatGQL } from '../../apollo-cliente/chat';
import Image from 'next/image';
import { getAvatarApollo } from '../../auth/provider/getAvatar';
import { FeedItem } from './feedItem';

export const Feed: NextPage = () => {
    const {chatState, dispatch} = useChatContext()
    const {auth} = useAppContext()
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
            <div>
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
