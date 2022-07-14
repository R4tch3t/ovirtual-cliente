import {NextPage} from 'next'
import { Fragment, UIEventHandler, useState } from 'react'
import {
  EmojiHappyIcon,
  EmojiSadIcon,
  FireIcon,
  HeartIcon,
  PaperClipIcon,
  ThumbUpIcon,
  XIcon,
} from '@heroicons/react/solid'
import { Listbox, Transition } from '@headlessui/react'
import {MensajeDe} from './MensajeDe'
import {MensajePara} from './MensajePara'
import { useChatContext } from '../context/chat/ChatContext'
import { useAppContext } from '../auth/authContext'
import { useSocketContext } from '../context/SocketContext'
import Info from './Info'
import Warning from './Warning'
import { types } from '../types/types'
import { Loading } from '@nextui-org/react'
import Fade from "@mui/material/Fade";
import { MensajeCargando } from './MensajesCargando'
import { grabarMensajeGQL, obtenerChatGQL, TipoNuevoMsj, upReadGQL } from '../apollo-cliente/chat'
import client from '../apollo-cliente'
import Image from 'next/image'
import useEffect from 'react';
const moods = [
    { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
    { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
    { name: 'Happy', value: 'happy', icon: EmojiHappyIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
    { name: 'Sad', value: 'sad', icon: EmojiSadIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
    { name: 'Thumbsy', value: 'thumbsy', icon: ThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
    { name: 'I feel nothing', value: null, icon: XIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

type TypeScroll = UIEventHandler<HTMLDivElement>
function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const Chatbox: NextPage = () => {
let bandChange = false
const {chatState,dispatch}:any = useChatContext();
const {chatActivo} = chatState;
const [selected, setSelected] = useState(moods[5]);
const [mensaje, setMensaje] = useState('');
const [cargandoMsjs, setCargandoMsjs] = useState(false);
const {socket}:any = useSocketContext();
const {auth} = useAppContext();
const localFoto = localStorage.getItem('fotoPerfil') 
const imageUrl=auth?.usuario?.avatar! ? auth?.usuario?.avatar! : 
      (localFoto?localFoto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxYfvIZ4RJ4x79EtaIcgNs8EgQTx2C3eG-w&usqp=CAU")



const onChange = ({target}:any) => {
  bandChange=true
  keyDown()
  const {value}:any = target;
  setMensaje(value);
  setTimeout(changeBand,500);
}

const changeBand = () => {
  bandChange=false
    setTimeout(keyUp,500);
}

const keyUp = () => {
  if(bandChange) return;

  socket.emit('writingUp',
  {
    de:auth?.id!,
    para:chatState.chatActivo.id,
  }
  );
}

const keyDown = () => {
  socket.emit('writingDown',
  {
    de:auth?.id!,
    para:chatState.chatActivo.id
  }
  );
}

const onSubmit=async(e:any)=>{
  
  e.preventDefault();
  if(mensaje.length===0){return;}

  let nuevoMsj: TipoNuevoMsj = 
  {
    de:auth?.id!,
    para:chatState.chatActivo.id!,
    readed: false!,
    mensaje:mensaje!
  }

  
  const socketMsj = await grabarMensajeGQL(nuevoMsj)
  socket.emit('mensaje-personal',{
    socketMsj: {
      ...socketMsj,
      nombre: auth?.usuario?.alumno?.nomentalu!
    }
  });
  

  setMensaje('');
}

const handleReaded = async() => {  
  const {id} = chatActivo!
  const resp = await upReadGQL(id!,auth?.id!)

  if(resp){
    await client.cache.reset()
    socket.emit("getUsuarios");
    
    socket.emit("recargarChat",{
      de:auth?.id!,
      para:chatState.chatActivo.id,
    });
        
  }
}

let skip = 30;
let take = 60;
const onScroll:TypeScroll = async (event)=>{
  let topCero = event.currentTarget.scrollTop-event.currentTarget.offsetHeight
  topCero += event.currentTarget.scrollHeight
  
  //Paginar 30 mensajes+ y zona muerta de 10pts
  if(topCero<10){
    
    setCargandoMsjs(!chatState.topeMsjs);
    
    event.preventDefault();
    const resp = await obtenerChatGQL(auth?.id!,chatState?.chatActivo?.id!,skip,take)
    setCargandoMsjs(false);
    dispatch({
        type: types.paginarMensajes,
        payload: resp.mensajes
    });
    skip+=30;
    take+=30;   
  }

}

if(!chatActivo.id){
  return(
    <div className='h-full wMid' >
      <Info msg={"Seleciona un contacto en la barra laretal derecha para iniciar una conversación."} />
    </div>
  );
}else{
  const nombreDe = chatState?.chatActivo?.alumno! ? chatState.chatActivo.alumno.nomentalu : chatState.chatActivo.nombre
  const nombrePara = auth?.usuario?(auth.usuario.alumno?auth.usuario.alumno.nomentalu:auth.usuario.nombre):null 
  return (<>
    <div className='h-full chatBoxMain' onMouseUp={handleReaded} >
      {!chatState.mensajes.length && !chatState.cargando &&
        <div className='h-full wMid' >
          <Warning msg={"Envia un mensaje para iniciar una conversación..."} />
        </div>
      }
      {chatState.cargando &&
        <div className='h-full wMid' >
          <Loading type="spinner" size="lg" />
        </div>
      }
      {chatState.mensajes.length > 0 && 
      <Fade in={true}>
        <div id='chatBox' className='h-full w-full chatBox mainFlow' onScroll={onScroll}  >
          
          {chatState.mensajes.map((msj:any,i:any)=>{
            return(((msj.para===auth?.id!) ?
                <MensajeDe key={msj.id} de={msj.id} ultimo={i===0} name={nombreDe} txt={msj.mensaje} time={msj.time} />: 
                <MensajePara key={msj.id} de={msj.id} para={msj.para} ultimo={i===0} name={nombrePara} txt={msj.mensaje} time={msj.time} 
                  readed={(0===i&&msj.readed)?'S':(!msj.readed?'N':null)} 
                />)) 
          })}
          {cargandoMsjs&&<MensajeCargando />}
        </div>
      </Fade>}
        
    <div className="flex items-start space-x-4 w-full"  >
      <div className="flex-shrink-0">
        <div className="inline-block h-10 w-10 rounded-full overflow-hidden" >
          <Image
            className="inline-block h-10 w-10 rounded-full"
            width={'100%'} height={'100%'}  
            placeholder='blur' 
            blurDataURL={imageUrl}
            src={imageUrl}
            alt=""
          />
        </div>
      </div>
      <div className="min-w-0 flex-1" >
      <form  className="relative" onSubmit={onSubmit} >
        <div className="relative" >
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="msj" className="sr-only">
              Escribir mensaje...
            </label>
            <textarea
              rows={3}
              name="msj"
              id="msj"
              className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
              placeholder="Escribir mensaje..."
              value={mensaje}
              onChange={onChange}
              
            />

            <div className="py-2" aria-hidden="true">
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <button
                  type="button"
                  className="-m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500"
                >
                  <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Attach a file</span>
                </button>
              </div>
              <div className="flex items-center">
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="sr-only">Your mood</Listbox.Label>
                      <div className="relative">
                        <Listbox.Button className="relative -m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500">
                          <span className="flex items-center justify-center">
                            {selected.value === null ? (
                              <span>
                                <EmojiHappyIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                                <span className="sr-only">Add your mood</span>
                              </span>
                            ) : (
                              <span>
                                <div
                                  className={classNames(
                                    selected.bgColor,
                                    'w-8 h-8 rounded-full flex items-center justify-center'
                                  )}
                                >
                                  <selected.icon className="flex-shrink-0 h-5 w-5 text-white" aria-hidden="true" />
                                </div>
                                <span className="sr-only">{selected.name}</span>
                              </span>
                            )}
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 -ml-6 w-60 bg-white shadow rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                            {moods.map((mood) => (
                              <Listbox.Option
                                key={mood.value}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'bg-gray-100' : 'bg-white',
                                    'cursor-default select-none relative py-2 px-3'
                                  )
                                }
                                value={mood}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={classNames(
                                      mood.bgColor,
                                      'w-8 h-8 rounded-full flex items-center justify-center'
                                    )}
                                  >
                                    <mood.icon
                                      className={classNames(mood.iconColor, 'flex-shrink-0 h-5 w-5')}
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <span className="ml-3 block font-medium truncate">{mood.name}</span>
                                </div>
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
    </div>
    </>
  )
}
}



export default Chatbox