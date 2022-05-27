import Image from 'next/image'
import { useAppContext } from "../../auth/authContext";
import { useTramitesContext } from '../../context/tramites/TramitesContext';
import IconUni from '../../public/iconUni.png'
import { types } from '../../types/tramites'

const icon = <Image src={IconUni} width={60} height={60} />
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

export const SeleccionarPlan = () => {
    const {dispatch}:any = useTramitesContext();
    const {auth} = useAppContext();
    let c = -1

    const seleccionarPlan = (usuarioId:number, plesXur: number, planElegido: string,  unidadAcademica:string) => {
        dispatch({
          type: types.seleccionarPlanBajaTemporal,
          payload: {usuarioId, plesXur, planElegido, unidadAcademica}
        });
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Baja temporal de estudios</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Permite a un estudiante estar fuera por un periodo de tiempo.</p>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1">
            <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-1 sm:gap-px">
                {auth?.usuario?.vwAlumnoConPlanes?.map((alup, alupId)=>{
                    c = colores.length-1 === c ? 0 : c+1
                     return(
                        <div
                          key={alup.PLESXUR}
                          onMouseDown={()=>{
                            const {PLESXUR, PLANESTUDIOS, ESCUELA} = alup;
                            seleccionarPlan(auth.id!, PLESXUR, PLANESTUDIOS,ESCUELA) 
                          }}
                          className={classNames(
                            alupId === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                            alupId === 1 ? 'sm:rounded-tr-lg' : '',
                            alupId === auth?.usuario?.vwAlumnoConPlanes?.length! - 2 ? 'sm:rounded-bl-lg' : '',
                            alupId === auth?.usuario?.vwAlumnoConPlanes?.length! - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
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
                                {alup.PLANESTUDIOS}
                              </a>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                              {alup.ESCUELA}
                            </p>
                            <div style={{textAlign: 'center'}} >
                                <p className="mt-2 text-sm text-gray-500">
                                    <b>Seleccionar plan</b>
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
              
            </dl>
          </div>
    
        </div>
      )
}