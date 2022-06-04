import { Combobox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { useTramitesContext } from '../../../../../../context/tramites/TramitesContext'
import { types } from '../../../../../../types/tramites'
import { cambiarEstado } from '../helper'

type TypeOpciones = {
    id: number,
    nombre: string
}

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

const opciones:TypeOpciones[] = [
    {id: 0, nombre: 'Trabaja tiempo completo con pago' },
    {id: 1, nombre: 'Trabaja medio tiempo con pago'},
    {id: 2, nombre: 'No trabaja'},
    {id: 3, nombre: 'Falleció'},
    {id: 4, nombre: 'No sé'},
]

const EmpleoPadre = () => {
    const {tramitesState, dispatch} = useTramitesContext()
    const [query, setQuery] = useState('')
    const {paso5} = tramitesState.procedimientos.preregistro!
    const naSelec = paso5 ? opciones?.find((op) => {
        return op.id === paso5.empleoPadreID
    }) : undefined;
    
    const opFiltrado =
    query === ''
      ? opciones
      : opciones?.filter((op) => {
          return op.nombre.toLowerCase().startsWith(query.toLowerCase())
      });

      const handleChange = (op:TypeOpciones) => {
        const nombrePaso='paso5';
        const nombreCampo='empleoPadreID';
        const valorCampo=op.id;

        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso,nombreCampo,valorCampo}
        });
        cambiarEstado(dispatch)
      }
    
    return (
        <>
        <Combobox as="div" value={naSelec} onChange={handleChange}  >
        <Combobox.Label className="block text-sm font-medium text-gray-700"><span className="mt-2 text-sm text-red-500">* </span>¿Qué tipo de empleo tiene su padre o tutor?:  </Combobox.Label>
        <div className="relative mt-1"  >
            <Combobox.Input
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(op:TypeOpciones) => op.nombre}
            
            />
            <Combobox.Button className={`absolute w-full inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none`}>
            <SelectorIcon className="h-5 w-5 text-gray-400 absolute right-0" aria-hidden="true" />
            </Combobox.Button>
            
            {(opFiltrado&&opFiltrado!.length > 0) && (
            <Combobox.Options  className="absolute z-999 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {opFiltrado!.map((op) => (
                <Combobox.Option
                    key={op.nombre+"empleoPadre"}
                    value={op}
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
                            {op.nombre}                            
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
        {paso5?.empleoPadreID! === undefined && 
            <span className="mt-2 text-xs text-red-500">
                Error, campo requerido
            </span>
        }
        </>
    )
}

export {EmpleoPadre}