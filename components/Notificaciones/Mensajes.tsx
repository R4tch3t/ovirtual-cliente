/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect, FC } from 'react'
import { Transition } from '@headlessui/react'
import { useAppContext } from '../../auth/authContext';
import { getAvatarApollo } from '../../auth/provider/getAvatar';
import Image from "next/image";
import { useChatContext } from '../../context/chat/ChatContext';
import { types } from '../../types/types';
import { obtenerChatGQL } from '../../apollo-cliente/chat';
import { scrollToBottom } from '../../helpers/scrollToBottom';
import Router from 'next/router';
import { obtenerUsuarioGQL } from '../../apollo-cliente/chat/obtenerUsuario';
import { useNotiContext } from '../../context/notificaciones/NotiContext';
import { typesNoti } from '../../types/notificaciones';
import { actualizarNotificacionGQL } from '../../apollo-cliente/notificacion';

type Props = {
  msj: any
  //nombre: string,
  //mensaje: string,
  //de: number
}

export const NotiMensaje:FC<Props> = ({msj}) => {
  const {mensaje, de, count} = msj
  const {chatState,dispatch} = useChatContext()
  const notiContext = useNotiContext()
  const {auth} = useAppContext()
  const [show, setShow] = useState(auth?.logged!)
  const [avatar,setAvatar] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxYfvIZ4RJ4x79EtaIcgNs8EgQTx2C3eG-w&usqp=CAU")
  const nombre = msj.titulo.split(' dice').join('').split(':').join('');
  useEffect(()=>{
    setShow(auth?.logged!)
    getAvatarApollo(de).then((avatar)=>{          
      setAvatar(avatar)
    })
  },[auth?.logged, mensaje])

  const onClick = async () => {
    //const user = {id: de}
    
    //const user = chatState.usuarios.find((u)=>{return u.id===de})
    //const newItem = {...item, readed: 1}
    setShow(false)
    const {id, de, para, count, titulo, time} = msj

    const user = (await obtenerUsuarioGQL(de)).usuario
    dispatch({
        type: types.activarChat,
        payload: user
    });
    const newMsj = {...msj, readed: 1, count: 1}
    //msj.readed=1
    //msj.count=1
            
    await actualizarNotificacionGQL({id,de,para,count, titulo, mensaje: newMsj.mensaje, time, readed:1})
    notiContext.dispatch({type: typesNoti.nuevoMsj, payload:{mensajes: [newMsj]}})

    const resp = await obtenerChatGQL(auth?.id!,user.id,0,30)
    dispatch({
        type: types.cargarMensajes,
        payload: resp.mensajes
    });
    
    await Router.push('/chat')

    scrollToBottom('chatBox');
    
}

  return (
    <>      
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
              <div className="w-0 flex-1 p-4 border-r">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">

                      <div className="inline-block h-10 w-10 rounded-full overflow-hidden" >
                        <Image
                          className="inline-block h-10 w-10 rounded-full"
                          width={'100%'}
                          height={'100%'}
                          placeholder='blur' 
                          blurDataURL={avatar}
                          src={avatar}
                          alt=""
                        />
                    </div>

                  </div>
                  <div className="ml-3 w-0 flex-1">
                    {(!count||count<2)&&<p className="text-sm font-medium text-gray-900">{nombre} <span className="mt-1 text-sm text-sky-500">dice:</span> </p>}
                    {(count>1)&&<p className="text-sm font-medium text-gray-900">{nombre}</p>}
                    <p className={`mt-1 text-sm text-${count>1?'sky':'gray'}-500`}>{mensaje}</p>
                  </div>
                </div>
              </div>

             <div className="flex">
                <div className="flex flex-col divide-y divide-gray-200">
                  <div className="h-0 flex-1 flex">
                    <button
                      type="button"
                      className="w-full border border-transparent rounded-none rounded-tr-lg px-4 py-3 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:z-10 focus:ring-2 focus:ring-indigo-500"
                      onClick={onClick}
                    >
                      Responder
                    </button>
                  </div>
                  <div className="h-0 flex-1 flex">
                    <button
                      type="button"
                      className="w-full border border-transparent rounded-none rounded-br-lg px-4 py-3 flex items-center justify-center text-sm font-medium text-red-500 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            
              
            </div>
          </Transition>
      </>
  )
}