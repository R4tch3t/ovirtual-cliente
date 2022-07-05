import { FC, useEffect, useState } from "react"
import { useChatContext } from "../../context/chat/ChatContext"
import { diffDate } from '../../helpers/spellDate';
import {types} from '../../types/types';
import { obtenerChatGQL } from '../../apollo-cliente/chat';
import { scrollToBottom } from '../../helpers/scrollToBottom';
import { useAppContext } from "../../auth/authContext";
import { getAvatarApollo } from '../../auth/provider/getAvatar';
import Image from 'next/image';

type Props = {
    user:any
}
export const FeedItem:FC<Props> = ({user}) => {
    const {chatState, dispatch} = useChatContext()
    const {auth} = useAppContext()
    const [avatar, setAvatar] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/480px-Avatar_icon_green.svg.png')
    const onClick = async ({currentTarget}:any,user:any) => {

        dispatch({
            type: types.activarChat,
            payload: user
        });
        const resp = await obtenerChatGQL(auth?.id!,user.id,0,30)
        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes
        });
        
        scrollToBottom('chatBox');
    }

    useEffect(()=>{
        getAvatarApollo(user.id).then((avatar)=>{            
            setAvatar(avatar)
        })
    },[user.id])

    return (
        <li className="py-4">
                        <div 
                            className={`border-2 border-gray-200 border-dashed rounded-lg select-feed relative${user.id===chatState.chatActivo.id?' selected-feed':''}`}
                            onMouseEnter={(e)=>{}}  onMouseUp={(e)=>{onClick(e,user)}} 
                            style={{height: 50}}
                        >
                        <div className="flex space-x-3">                            
                        <div className="h-6 w-6 rounded-full" >
                            <Image 
                                className="h-6 w-6 rounded-full"
                                width={'100%'}
                                height={'100%'} 
                                placeholder='blur' 
                                blurDataURL={avatar!}
                                src={avatar!} alt="" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">{user.alumno?user.alumno.nomentalu:user.nombre}</h3>
                                {(user.online===true||user.online===1)&&<>
                                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-400" />
                                    <p className="text-sm text-green-500"><b>En linea</b></p>
                                </>}
                                {(user.online===false||user.online===0)&&<>
                                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-gray-400" />
                                    <p className="text-sm text-gray-500">{diffDate(user.lastConn,new Date())}</p>
                                </>}
                            </div>
                            {user.lastMsg && user.lastMsg.para === auth?.id && <p className="text-sm text-blue-500">                            
                            {user.lastMsg.mensaje}
                                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-blue-400" />
                            </p>
                            }                            
                            {user.writing &&
                            <span className="text-sm text-green-500">
                                escribiendo...
                            </span>
                            }
                        </div>
                        </div>
                        
                        
                        
                        </div>
                    </li>
    )
}