import Image from 'next/image'
import { FC, useState } from 'react'
import { useTramitesContext } from '../../../../context/tramites/TramitesContext'
import { TypeUnidadesAcademicas } from '../../../../interfaces'
import { types } from '../../../../types/tramites'

import { Combobox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

type Props = {
  unidadesAcademicas: TypeUnidadesAcademicas[],
  unidadDestino: number | null 
}


function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const UnidadesAcademicas:FC<Props> = ({unidadesAcademicas, unidadDestino}) => {
  const {dispatch}:any = useTramitesContext();
  let c = -1
  const y = new Date().getFullYear()
  const seleccionarPlan = (planID: number, planElegido: string, 
    nivelIngresar: number, tramiteId: number | null, localidad: string,
    ) => {
    dispatch({
      type: types.seleccionarPlan,
      payload: {
        planID, planElegido, nivelIngresar,
        tramiteId, localidad
      }
    });
  }
  const naSelec = unidadesAcademicas.find((r) => r.id===unidadDestino);
  const [query, setQuery] = useState('')
  const unidadFiltrado =
    query === ''
      ? unidadesAcademicas
      : unidadesAcademicas?.filter((unidad) => {
          const queryToLow = query.toLowerCase()
          return unidad.nombrePlanEstudios.toLowerCase().includes(queryToLow) || 
            unidad.nombreUnidadAcademica.toLowerCase().includes(queryToLow)
      });

      const handleChange = (plan:TypeUnidadesAcademicas) => {
        let nombreTramite = 'cambioUnidadAcademica'
        let nombreValor='unidadDestino';
        let valor:any=plan.id//JSON.stringify(plan);
        
        dispatch({
            type: types.cambiarEstado,
            payload: {nombreTramite,nombreValor,valor}
        });

        let arrFormValido = [true,{unidadDestino:{color: 'primary'}}]
        //arrFormValido[0] = validarTelefono(arrFormValido)
        //arrFormValido[0] = arrFormValido[0] && validarPlanIngresarId(valor!+"",arrFormValido)
        
        let formValido = arrFormValido[0] 

        nombreValor = 'validoParaTramitar'
        valor = formValido

        dispatch({
            type: types.cambiarEstado,
            payload: {nombreTramite,nombreValor,valor}
        });

      }
    
    return (
        <>
        <Combobox as="div" value={naSelec} onChange={handleChange}  >
        {/*<Combobox.Label className="block text-sm font-medium text-gray-700"><span className="mt-2 text-sm text-red-500">* </span>Seleccionar escuela:  </Combobox.Label>*/}
        <div className="relative mt-1"  >
            <Combobox.Input
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(plan:TypeUnidadesAcademicas) => (`ESCUELA: ${plan.nombreUnidadAcademica}, PLAN: ${plan.nombrePlanEstudios} `)}
            
            />
            <Combobox.Button className={`absolute w-full inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none`}>
                <SelectorIcon className="h-5 w-5 text-gray-400 absolute right-0" aria-hidden="true" />
            </Combobox.Button>
            
            {(unidadFiltrado&&unidadFiltrado!.length > 0) && (
            <Combobox.Options  className="absolute z-999 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {unidadFiltrado!.map((plan,i) => (
                <Combobox.Option
                    key={plan.claveUnidadAcademica+" "+i}
                    value={plan}
                    className={({ active }) =>
                    classNames(
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    )
                    }
                >
                    {({ active, selected }) => (
                    <>
                        <div className="flex items-center">                                                    

                        <span className={classNames('ml-3 truncate', selected && 'font-semibold')}>
                            ESCUELA: {plan.nombreUnidadAcademica}, PLAN: {plan.nombrePlanEstudios}
                        </span>

                        </div>

                        {selected && (
                        <span
                            className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-indigo-600'
                            )}
                        >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        )}

                    </>
                    )}
                </Combobox.Option>
                ))}
            </Combobox.Options>
            )}
        </div>
        </Combobox>        
        </>
    )
}

export  {
    UnidadesAcademicas
}