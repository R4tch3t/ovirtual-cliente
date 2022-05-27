import { Combobox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { useTramitesContext } from '../../../../../../context/tramites/TramitesContext'
import { TipoEntidadesFederativas, useEntidadesFederativas } from '../../../../../../hooks'
import { types } from '../../../../../../types/tramites'
import { cambiarEstado } from '../helper'

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

const EntidadFederativa = () => {
    const { data, loading, error } = useEntidadesFederativas()
    const {tramitesState, dispatch} = useTramitesContext()
    const [query, setQuery] = useState('')
    if(!data){
        return <></>
    }
    const {entidadesFederativas} = data!
    const {paso2} = tramitesState.procedimientos.homologacion!
    const naSelec = paso2 ? entidadesFederativas?.find((entidad) => {
        return entidad.id === paso2.entidadFedID
    }) : undefined;
    
    
    const entidadFiltrado =
    query === ''
      ? entidadesFederativas
      : entidadesFederativas?.filter((entidad) => {
          return entidad.nombre.toLowerCase().startsWith(query.toLowerCase())
      });

      const handleChange = (entidad:TipoEntidadesFederativas) => {
        const nombrePaso='paso2';
        const nombreCampo='entidadFedID';
        const valorCampo=entidad.id;

        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso,nombreCampo,valorCampo}
        });
        cambiarEstado(dispatch)
      }
    
    return (
        <>
        <Combobox as="div" value={naSelec} onChange={handleChange}  >
        <Combobox.Label className="block text-sm font-medium text-gray-700"><span className="mt-2 text-sm text-red-500">* </span>Seleccionar entidad federativa:  </Combobox.Label>
        <div className="relative mt-1"  >
            <Combobox.Input
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(entidad:TipoEntidadesFederativas) => entidad.nombre}
            
            />                                                  
            <Combobox.Button className={`absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none`}>
            <SelectorIcon className="h-5 w-5 text-gray-400 absolute right-0" aria-hidden="true" />
            </Combobox.Button>
            
            {(entidadFiltrado&&entidadFiltrado!.length > 0) && (
            <Combobox.Options  className="absolute z-999 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {entidadFiltrado!.map((entidad) => (
                <Combobox.Option
                    key={entidad.id}
                    value={entidad}
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
                            {entidad.nombre}
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
        {paso2?.entidadFedID! === undefined && 
            <span className="mt-2 text-xs text-red-500">
                Error, campo requerido
            </span>
        }
        </>
    )
}

export {EntidadFederativa}