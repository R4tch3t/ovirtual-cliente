
import { useAppContext } from "../../../auth/authContext";
import { useTramitesContext } from '../../../context/tramites/TramitesContext';
import { types } from '../../../types/tramites'
import { Spacer } from "@nextui-org/react";
import Info from '../../Info';
import { FC } from 'react';
import { LayoutPlanes } from './layoutPlanes';

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

type Props = {
  nombreContextState: string
}

export const SeleccionarPlan:FC<Props> = ({nombreContextState}) => {
    const {dispatch}:any = useTramitesContext();
    const {auth} = useAppContext();
    let c = -1

    const infoMsg = "Atención, no se encontró registro de su plan ó planes de estudios porfavor diríjase a la DAE y pida que solucionen su caso. "; 

    const seleccionarPlan = (usuarioId:number, plesXur: number, planElegido: string,  unidadAcademica:string, procedure:string) => {
      //Lo mas probable es que sea una función universal para todos los tramites
        dispatch({
          type: types.seleccionarPlanProcedure,
          payload: {usuarioId, plesXur, planElegido, unidadAcademica, procedure}
        });
    }

    return (
        
          
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            {!auth?.usuario?.vwAlumnoConPlanes?.length!&&!auth?.usuario?.vwAspirante?.length!&&
                <div>
                  <Spacer y={1}  />
                  <Info msg={infoMsg} />
                </div>
            }
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1">
            <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-1 sm:gap-px">
              {auth?.usuario?.vwAspirante?.map((alup, alupId)=>{
                    c = colores.length-1 === c ? 0 : c+1
                     return (
                        <LayoutPlanes 
                          alup={{
                            PLESXUR: alup.ID_PLAN,
                            PLANESTUDIOS: alup.PLANESTUDIOS,
                            ESCUELA: alup.UA
                          }} 
                          userId={auth.id!}
                          seleccionarPlan={seleccionarPlan}
                          nombreContextState={nombreContextState}
                          className={
                            classNames(
                              alupId === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                              alupId === 1 ? 'sm:rounded-tr-lg' : '',
                              alupId === auth?.usuario?.vwAspirante?.length! - 2 ? 'sm:rounded-bl-lg' : '',
                              alupId === auth?.usuario?.vwAspirante?.length! - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                              'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                            )
                          }
                          classNameSpan={
                            classNames(
                              colores[c].iconBackground,
                              colores[c].iconForeground,
                              'rounded-lg inline-flex p-3 ring-4 ring-white'
                              )
                          }
                            />
                      )
                })}

                {auth?.usuario?.vwAlumnoConPlanes?.map((alup, alupId)=>{
                    c = colores.length-1 === c ? 0 : c+1
                     return (
                        <LayoutPlanes 
                          alup={alup} 
                          userId={auth.id!}
                          seleccionarPlan={seleccionarPlan}
                          nombreContextState={nombreContextState}
                          className={
                            classNames(
                              alupId === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                              alupId === 1 ? 'sm:rounded-tr-lg' : '',
                              alupId === auth?.usuario?.vwAlumnoConPlanes?.length! - 2 ? 'sm:rounded-bl-lg' : '',
                              alupId === auth?.usuario?.vwAlumnoConPlanes?.length! - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                              'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                            )
                          }
                          classNameSpan={
                            classNames(
                              colores[c].iconBackground,
                              colores[c].iconForeground,
                              'rounded-lg inline-flex p-3 ring-4 ring-white'
                              )
                          }
                            />
                      )
                })}

                        
                  
            </div>
              
            </dl>
          </div>
    
        
      )
}