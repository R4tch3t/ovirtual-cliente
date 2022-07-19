/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ChartBarIcon,
  CursorClickIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
} from '@heroicons/react/outline'
import {
    BellIcon,
} from '@heroicons/react/outline'
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useNotiContext } from '../../../context/notificaciones/NotiContext';
import Info from '../../Info';
import { useAppContext } from '../../../auth/authContext';
import { obtenerNotisGQL } from '../../../apollo-cliente/notificacion';
import { typesNoti } from '../../../types/notificaciones';
import { FlayoutItem } from './FlayoutItem';
import { useActualizarNotificacionTramite } from '../../../hooks/useQuery/notificaciones';
import { FlayoutItemTramite } from './FlayoutItemTramite';
import { Notificacion, NotiMensaje, NotiTramite } from '../../Notificaciones';
let timeNotiTramiteRef:any = null

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -2,
      top: 27,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
}));

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  FixedMenu?: boolean
}

export const FlayoutNoti:FC<Props> = ({FixedMenu}) => {
const {auth} = useAppContext()
const {notiState, dispatch} = useNotiContext()
const maxHeight = window.document.body.offsetHeight
const notiMsjFilter = notiState?.msjs?.filter((n)=>{ return ( !parseInt(n?.readed!+"") && n.de !== auth?.id ) })
const notiTramiteIn = {idUser: auth?.usuario?.id!, idTramite: null}
const {data, refetch} = useActualizarNotificacionTramite(notiTramiteIn)
const datosNotiTramite = data?.actualizarNotificacionTramite!.filter((nt)=>{ return ( nt.estado>3 && !parseInt(nt?.readed!+"")) })
let badgeContent = notiMsjFilter?.length! //+ datosNotiTramite?.length!

if(datosNotiTramite?.length!>0){
  badgeContent+=datosNotiTramite?.length!
}

/*
useEffect(()=>{
    obtenerNotisGQL(0,auth?.id!).then((r)=>{
        const {notiMensajes} = r
        dispatch({type: typesNoti.notiMsjCargados, payload:{mensajes: notiMensajes}})
    })
},[])*/



//Loop que verifica el cambio en las notificaciones para los tramites
const loop = () => {
    
  if(data?.actualizarNotificacionTramite){
    timeNotiTramiteRef = setTimeout(()=>{
      clearTimeout(timeNotiTramiteRef)        
      refetch()              
      obtenerNotisGQL(0,auth?.usuario?.id!).then((r)=>{
        const {notiMensajes} = r
        dispatch({type: typesNoti.notiMsjCargados, payload:{mensajes: notiMensajes}})
        loop()
      })
      //loop()        
    },1500)
  }

}

useEffect(()=>{
  if(timeNotiTramiteRef!==null){
    clearTimeout(timeNotiTramiteRef)
  }
  loop()
},[data?.actualizarNotificacionTramite])

  return (
    <>
    {!FixedMenu && <Notificacion >
        {datosNotiTramite?.map((tramite,i)=>{
            return <NotiTramite                         
                        tramite={tramite}
                        key={'notiTramite'+i} 
                    />
            
        })}
        {notiMsjFilter?.map((msj,i)=>{
            if(auth?.id! !== (msj as any).de){
            return <NotiMensaje 
                        //nombre={nombre} 
                        //mensaje={mensaje} 
                        //de={de}
                        msj={msj}
                        key={'notiMsj'+i} 
                    />
            }
        })}
          
    </Notificacion>}
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-gray-900' : 'text-gray-500',
              'group bg-white rounded-full p-1 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            )}
          >
            <StyledBadge badgeContent={badgeContent} color="success">
                <BellIcon className="h-6 w-6" aria-hidden="true" />
            </StyledBadge>

          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className={`absolute z-10 mt-3 px-2 w-screen max-w-md sm:px-0`} style={{right: -25}}  >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 overflow-auto" style={{maxHeight: maxHeight}} >
                  {!notiMsjFilter?.length! && !datosNotiTramite?.length! && <Info msg='No tienes notificaciones...' /> }
                  {datosNotiTramite?.map((item) => {                    

                    return ( <FlayoutItemTramite key={item.id} item={item} /> )

                  })}
                  {notiMsjFilter?.map((item) => {
                    
                    return ( <FlayoutItem key={item.id} item={item} /> )
                    
                  })}
                  

                </div>
                {/*<div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                  {callsToAction.map((item) => (
                    <div key={item.name} className="flow-root">
                      <a
                        href={item.href}
                        className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition ease-in-out duration-150"
                      >
                        <item.icon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                        <span className="ml-3">{item.name}</span>
                      </a>
                    </div>
                  ))}
                </div>*/}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
    </>
  )
}