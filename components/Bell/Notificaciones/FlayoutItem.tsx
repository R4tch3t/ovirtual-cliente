import { FC, useState, useEffect } from "react"
import { actualizarNotificacionGQL, TipoNuevaNoti } from "../../../apollo-cliente/notificacion"
import Image from "next/image";
import { getAvatarApollo } from "../../../auth/provider/getAvatar";
import spellDate from "../../../helpers/spellDate";
import { useNotiContext } from "../../../context/notificaciones/NotiContext";
import { typesNoti } from "../../../types/notificaciones";
import { useChatContext } from "../../../context/chat/ChatContext";
import { types } from "../../../types/types";
import { obtenerChatGQL } from "../../../apollo-cliente/chat";
import Router from "next/router";
import { scrollToBottom } from "../../../helpers/scrollToBottom";
import { obtenerUsuarioGQL } from "../../../apollo-cliente/chat/obtenerUsuario";

interface Props {
    item: TipoNuevaNoti
}

export const FlayoutItem:FC<Props> = ({item}) => {
const notiContext = useNotiContext()
const chatContext = useChatContext()
const date = spellDate(item.time);
const [avatar,setAvatar] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxYfvIZ4RJ4x79EtaIcgNs8EgQTx2C3eG-w&usqp=CAU")
useEffect(()=>{
    getAvatarApollo(item.de).then((avatar)=>{          
        setAvatar(avatar)
    })
},[])

const onClick = async () => {
    const newItem = {...item, readed: 1}
    const {id, de, para, count, titulo, time,readed} = newItem
    
    await actualizarNotificacionGQL({id,de,para,count, titulo, mensaje: newItem.mensaje, time, readed})
    notiContext.dispatch({type: typesNoti.nuevoMsj, payload:{mensajes: [newItem]}})
    
    const user = await obtenerUsuarioGQL(de)
    chatContext.dispatch({
        type: types.activarChat,
        payload: user.usuario
    });

    const resp = await obtenerChatGQL(newItem?.para!,newItem.de,0,30)
    
    chatContext.dispatch({
        type: types.cargarMensajes,
        payload: resp.mensajes
    });
    
    await Router.push('/chat')

    scrollToBottom('chatBox');
   
}

    return (
        <div
            onMouseDown={onClick}
            className="cursor-pointer border-t-2 border-r-2 border-l-2 border-b-2 -m-3 p-3 flex items-start rounded-lg hover:bg-gray-100 transition ease-in-out duration-150"
        >
            {/*<item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" /> icon*/}
            <div className="inline-block h-9 w-9 rounded-full overflow-hidden" >
                <Image
                    className="inline-block h-9 w-9 rounded-full"
                    width={'100%'}
                    height={'100%'}
                    placeholder='blur' 
                    blurDataURL={avatar}
                    src={avatar}
                    alt=""
                />
            </div>
            <div className="ml-4">
            <p className="text-base font-medium text-gray-900">{item.titulo}</p>
            <p className="mt-1 text-sm text-sky-500">{item.mensaje}</p>
            <p className="mt-1 text-sm text-red-500">{date}</p>
            </div>
        </div>
    )
}