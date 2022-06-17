import { useEffect } from 'react';
import Router from 'next/router';
import Image from 'next/image'
import { Spacer, Loading } from '@nextui-org/react';
import { useTramitesContext } from "../../context/tramites/TramitesContext";
import { types } from "../../types/tramites";
import { useAppContext } from '../../auth/authContext';
import { useTodosTramitesAlumno } from '../../hooks/useQuery/tramites/todosTramitesAlumno';
import IconUni from '../../public/iconUni.png'
import Fade from '@mui/material/Fade';
import RetornarTramite from './RetornarTramite';
import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid';



const icon = <Image src={IconUni} width={60} height={60} />

const estadoTramite = (n:number) => {
  switch(n){
    case 1: return 'INICIADO'
    case 2: return 'EN REVISIÓN'
    case 3: return 'VALIDACION'
    case 4: return 'PARA CORRECIÓN'
    case 5: return 'APROBADO'
    case 6: return 'FINALIZADO'
    case 7: return 'CANCELADO'
  }
}


const colores = [
  {
      iconForeground: 'text-teal-700',
      iconBackground: 'bg-teal-50',
  },
  {
      iconForeground: 'text-purple-700',
      iconBackground: 'bg-purple-50',
  },
  {
      iconForeground: 'text-sky-700',
      iconBackground: 'bg-sky-50',
  },
  {  
      iconForeground: 'text-yellow-700', iconBackground: 'bg-yellow-50' },
  {
      iconForeground: 'text-rose-700',
      iconBackground: 'bg-rose-50',
  },
  {
      iconForeground: 'text-indigo-700',
      iconBackground: 'bg-indigo-50',
  },
]

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}


const TablaInicial = () => {
    const {auth} = useAppContext();
    const {tramitesState, dispatch} = useTramitesContext();
    const {tramites} = tramitesState
    let c = -1
    const {data, loading} = useTodosTramitesAlumno({userAlumnoId: auth?.id!})

    const seleccionarTramite = (tramiteId: number, usuarioId: number, plesXur: number, planElegido: string,  unidadAcademica:string) => {
      //agregar mas nombres de tramite
      const procedure = tramiteId===1?'bajaTemporal':
        (tramiteId===15?'homologacion':'')
      //Lo mas probable es que sea una función universal para todos los tramites
        dispatch({
          type: types.seleccionarPlanProcedure,
          payload: {usuarioId, plesXur, planElegido, unidadAcademica, procedure}
        });
        dispatch({
          type: types.seleccionarTramiteAlumno,
          payload: {tramiteId}
        });

    }

    useEffect(()=>{
      const {t} = Router.query as {t:string}
      const tramiteAlumno = data?.todosTramitesAlumno?.find((todos)=>{return todos.uuid===t})
      if(tramiteAlumno){
        const plexur = auth?.usuario?.vwAlumnoConPlanes?.find((alup)=>{return alup.PLESXUR===tramiteAlumno.plesxurRef})
        const {PLESXUR, PLANESTUDIOS, ESCUELA} = plexur!;
        seleccionarTramite(tramiteAlumno.tramiteId, auth?.id!, PLESXUR, PLANESTUDIOS,ESCUELA);
      }
    },[data?.todosTramitesAlumno])

    if(tramitesState.tramiteAlumnoSeleccionado!==null){
     return <RetornarTramite tramiteId={tramitesState.tramiteAlumnoSeleccionado} tramites={data?.todosTramitesAlumno!} />
    }

    if(loading){
      return (
        <div className='wMid mt-8' >
          <Loading type="spinner" size="lg" />
        </div>
      )
    }    

    //No se econtró registro de algun tramite
    if(!data?.todosTramitesAlumno){
      return <></>
    }

    

    return (
      <Fade in={true}>
        <div className="px-4 sm:px-6 lg:px-8">
          <Spacer y={2} />
          <div className="sm:flex sm:items-center">
            
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Mis tramites.</h1>
              <p className="mt-2 text-sm text-gray-700">
                A través de la presente sección se visualizará tu lista de trámites que haz mandado a revisión... 
              </p>
            </div>
            
          </div>
          <Spacer y={1} />
          <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
            
          <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-1 sm:gap-px">
              {data?.todosTramitesAlumno?.map((tramiteAlumno, tramiteId)=>{
                  c = colores.length-1 === c ? 0 : c+1
                  const {tramite} = tramiteAlumno//tramites?.find((t)=>{return t.id===tramiteAlumno.tramiteId})
                  const plexur = auth?.usuario?.vwAlumnoConPlanes?.find((alup)=>{return alup.PLESXUR===tramiteAlumno.plesxurRef})
                    return(
                      <div
                        key={tramiteAlumno.id}
                        onMouseDown={()=>{

                          const {PLESXUR, PLANESTUDIOS, ESCUELA} = plexur!;
                          seleccionarTramite(tramiteAlumno.tramiteId, auth?.id!, PLESXUR, PLANESTUDIOS,ESCUELA);

                        }}
                        className={classNames(
                          tramiteId === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                          tramiteId === 1 ? 'sm:rounded-tr-lg' : '',
                          tramiteId === data?.todosTramitesAlumno?.length! - 2 ? 'sm:rounded-bl-lg' : '',
                          tramiteId === data?.todosTramitesAlumno?.length! - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                          'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                        )}
                      >
                        <div style={{textAlign: 'center'}} >
                          <span
                            className={classNames(
                              colores[c].iconBackground,
                              colores[c].iconForeground,
                              'rounded-lg inline-flex p-3 ring-4 ring-white'
                            )}
                            
                          >
                                {icon} 
                          </span>
                        </div>
                        <div className="mt-8">
                          <h3 className="text-lg font-medium">
                            <a href={undefined} className="focus:outline-none">
                              <span className="absolute inset-0" aria-hidden="true" />
                              {tramite?.nombre}
                            </a>
                          </h3>
                          <p className="mt-2 text-sm text-gray-500">
                            <b>DESCRIPCIÓN: </b>  {tramite?.descripcion}
                          </p>
                          <p className="mt-2 text-sm text-gray-500">
                          <b>ESCUELA: </b>  {plexur?.ESCUELA}
                          </p>
                          <p className="mt-2 text-sm text-gray-500">
                            <b>PLAN DE ESTUDIOS: </b> {plexur?.PLANESTUDIOS}
                          </p>
                          <p className="mt-2 text-sm text-gray-500">
                            <b>FECHA DE CREACIÓN: </b> {tramiteAlumno.fechaCreacion}
                          </p>
                          <p className={`mt-2 text-sm 
                            ${
                              tramiteAlumno.estadoId===5?'text-green-500':
                              (tramiteAlumno.estadoId===4?'text-yellow-500':
                              (tramiteAlumno.estadoId===7?'text-red-600':'text-gray-500'))
                            } 
                          `}>
                            <b>ESTADO: </b> {estadoTramite(tramiteAlumno.estadoId)+' '}
                            
                            { (tramiteAlumno.estadoId===4) &&
                              <ExclamationIcon className="inline h-5 w-5 text-yellow-500" aria-hidden="true" />
                            }
                            { (tramiteAlumno.estadoId===7) &&
                              <ExclamationIcon className="inline h-5 w-5 text-red-600" aria-hidden="true" />
                            }
                            { tramiteAlumno.estadoId===5 &&
                              <CheckCircleIcon className="inline h-5 w-5 text-green-400" aria-hidden="true" />
                            }
                          </p>
                          <div style={{textAlign: 'center'}} >
                              <p className="mt-2 text-sm text-gray-500">
                                  <b>Ver tramite</b>
                              </p>
                          </div>
                        </div>
                        <span
                          className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                          aria-hidden="true"
                        >
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                          </svg>
                        </span>
                      </div>
                    )
              })}          
          </div>
          
          </div>

        </div>
      </Fade>
    )
  }

  export {TablaInicial}